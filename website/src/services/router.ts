import { isLoggedIn } from "./user";
import LoginPage from '@src/pages/auth/Login.vue'
import HomePage from '@src/pages/home/Home.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/login', component: LoginPage, name: "login" },
    { path: '/', component: HomePage },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
});

router.beforeEach((to, from) => {
    if (to.name !== 'login' && !isLoggedIn()) {
        return {
            path: '/login',
            // save the location we were at to come back later
            query: { redirect: to.fullPath },
        }
    }
});

const goToLoginPage = function () {
    router.push({ name: 'login', query: { next: getCurrentLocation() } })
}

const getCurrentLocation = function () {
    return window.location.hash.replace('#', '')
}

export {
    router,
    goToLoginPage,
    getCurrentLocation
}