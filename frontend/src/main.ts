import { createApp } from "vue";
import "./style.css";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import AuthForm from "./pages/AuthForm.vue";
import Dashboard from "./pages/Dashboard.vue";
import { useGlobalStore } from "./stores/globalStore";

const pinia = createPinia();

const routes = [
    {
        path: "/login",
        component: AuthForm,
        props: { mode: "login" },
    },
    {
        path: "/signup",
        component: AuthForm,
        props: { mode: "signup" },
    },
    {
        path: "/dashboard",
        component: Dashboard,
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const store = useGlobalStore();
    if (to.meta.requiresAuth) {
        try {
            await store.refresh();
            next();
        } catch {
            next("/login");
        }
    } else {
        next();
    }
});

createApp(App).use(pinia).use(router).mount("#app");
