import { createApp } from "vue";
import "./style.css";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

// pages
import App from "./App.vue";
import AuthForm from "./pages/AuthForm.vue";
import Dashboard from "./pages/Dashboard.vue";
import { useGlobalStore } from "./stores/globalStore";

const routes = [
    {
        path: "/log-in",
        component: AuthForm,
        props: { mode: "login" },
    },
    {
        path: "/sign-up",
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
    let isLoggedIn = await fetch("http://localhost:5000/auth/status", {
        credentials: "include",
    });
    isLoggedIn = await isLoggedIn.json();
    console.log(isLoggedIn.status);
    if (to.meta.requiresAuth && !isLoggedIn) {
        next("/login");
    } else next();
});

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
