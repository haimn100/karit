import { ref } from "vue";
import { router } from "@src/services/router";
import { ApiRequest, ApiResponse, get, post, del, put } from "@src/utils/network";
import { goToLoginPage, getCurrentLocation } from "./router";
import { AxiosError, AxiosResponse } from "axios";


export type UseApiResponse = {
    data: any;
    error: any;
    isLoading: any;
    callApi: any
}

export function useApi(req: ApiRequest): UseApiResponse {

    const data = ref();
    const error = ref();
    const isLoading = ref(true);

    const isAuthError = function (error: any) {
        return error.response && (error.response.status >= 400 && error.response.status < 500);
    }

    const callApi = function (): Promise<any> {

        const res: any = requestApi(req)

        res
            .then(function (response: any) {
                if (response.status === 200) data.value = response.data;
                else data.value = 'Not Found'; //TODO: handle various status codes
            })
            .catch(function (err: any) {
                // if (isAuthError(err)) error.value = { msg: 'Action not allowed', auth: true };
                // else
                error.value = err;
            })
            .finally(function () {
                isLoading.value = false;
            });
        return res;
    }

    return { data, error, isLoading, callApi };
}

export const requestApi = async function (req: ApiRequest): Promise<ApiResponse> {

    try {
        req.path = '/api/' + req.path;
        req.verb = req.verb || 'get';
        let verbMethod: any;

        if (req.verb.toLowerCase() === "get") verbMethod = get;
        if (req.verb.toLowerCase() === "post") verbMethod = post;
        if (req.verb.toLowerCase() === "put") verbMethod = put;
        if (req.verb.toLowerCase() === "delete") verbMethod = del;

        const res: AxiosResponse = await verbMethod(req);

        return {
            ok: res.status >= 200 && res.status < 300,
            status: res.status,
            data: res.data,
            reason: res.statusText
        }
    }
    catch (ex: any) {
        if (ex.response)
            return {
                ok: false,
                status: ex.response.status,
                data: ex.response.data,
                reason: ex.response.statusText,

            }
        return {
            ok: false,
            status: -1,
            reason: ex
        }
    }
}
