import axios, { AxiosResponse } from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export type ApiRequest = {
    path: string;
    verb?: string,
    responseType?: any,
    payload?: any;
    /**
     * Wheter to add csrf token to the request (token should already exist in cookie)
     */
    protected?: boolean
}

export type ApiResponse = {
    status: number;
    ok: boolean;
    data?: any;
    reason?: string
}

const _fetchSafe = axios.create({ withCredentials: true });
const _fetch = axios.create();

export const get = (req: ApiRequest): Promise<AxiosResponse<any, any>> => {
    return _fetch.get(req.path, { responseType: req.responseType || 'json', data: req.payload })
}

export const del = (req: ApiRequest): Promise<AxiosResponse<any, any>> => {
    return _fetch.delete(req.path, req.payload)
}

export const put = (req: ApiRequest): Promise<AxiosResponse<any, any>> => {
    return _fetchSafe.put(req.path, req.payload)
}

export const post = (req: ApiRequest): Promise<AxiosResponse<any, any>> => {
    return _fetchSafe.post(req.path, req.payload)
}