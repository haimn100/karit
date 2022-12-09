import logger from "@src/utils/logger";
import { requestApi } from "@src/services/api";
import { ApiResponse } from "@src/utils/network";
import { ref } from "vue";
import { getCookie } from "@src/utils/cookie"

class User {
    username: string;
}

const state = {
    user: ref()
}

export const isLoggedIn = (): boolean => {
    return getUser() !== null
}

export const logOut = async () => {
    await requestApi({ path: 'account/logout' })
    localStorage.removeItem('user');
    state.user.value = null;
}

export const login = async (username: string, password: string): Promise<ApiResponse> => {
    const res = await requestApi({ path: 'account/login/', payload: { username, password }, protected: true, verb: 'post' });
    if (res.ok) {
        saveUser(res.data);
    }
    return res;
}

export const getUser = (): User | null => {
    const userFromStorage = localStorage.getItem('user');
    return userFromStorage ? JSON.parse(userFromStorage) : null;
}

export const useUser = () => {
    return state.user;
}

export const saveUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    state.user.value = user;
}

