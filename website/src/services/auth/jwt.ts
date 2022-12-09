import jwt_decode from "jwt-decode";
import axios from "axios";
import logger from '@src/utils/logger';

const JWT_TOKEN_ACCESS = 'jwt_token_access'
const JWT_TOKEN_REFRESH = 'jwt_token_refresh'

export type Token = {
    access: string | null
    refresh: string | null
}

export const getToken = (): Token => {
    return {
        access: sessionStorage.getItem(JWT_TOKEN_ACCESS),
        refresh: localStorage.getItem(JWT_TOKEN_REFRESH)
    }
}

export const decodeToken = (token: string): any => {
    return jwt_decode(token);
}

export const saveToken = (token: Token) => {
    if (token.access) sessionStorage.setItem(JWT_TOKEN_ACCESS, token.access);
    if (token.refresh) localStorage.setItem(JWT_TOKEN_REFRESH, token.refresh)
}

export const clearToken = () => {
    sessionStorage.removeItem(JWT_TOKEN_ACCESS);
    localStorage.removeItem(JWT_TOKEN_REFRESH)
}

const jwtInterceptorInstance = axios.create({ withCredentials: true });

jwtInterceptorInstance.interceptors.request.use((config: any) => {
    const token = getToken();
    //Note: bearer with lowercase does not work
    config.headers.common["Authorization"] = `Bearer ${token.access}`;
    return config;
});

jwtInterceptorInstance.interceptors.response.use(
    (response) => { return response; },
    async (error) => {

        if (error.response.status === 401) {
            const requireRefresh = error.response.data.code && error.response.data.code === 'token_not_valid';

            if (requireRefresh) {
                const token: Token = getToken();

                logger.info('trying to refresh token')

                if (!token.refresh) {
                    logger.info('refresh token not found');
                    return Promise.reject(error);
                }
                try {
                    const response = await axios.post("/api/account/login/refresh/", {
                        refresh: token.refresh,
                    });

                    if (response.status !== 200) {
                        //clearToken();
                        logger.info('cleared token after refresh failed', response.statusText);
                        return Promise.reject(error);
                    }

                    error.config.headers[
                        "Authorization"
                    ] = `Bearer ${response.data.access}`;

                    saveToken(response.data)

                    logger.info('succesfuly refreshed token')

                    return axios(error.config);
                } catch (e) {
                    logger.error('unable to refresh token', e);
                    clearToken();
                    return Promise.reject(error);
                }
            }

        } else {
            return Promise.reject(error);
        }
    }
);

export const jwtInterceptor = jwtInterceptorInstance;