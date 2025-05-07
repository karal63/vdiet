import { createApp } from "vue";
import "./style.css";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

// pages
import App from "./App.vue";
import AuthForm from "./pages/AuthForm.vue";
import Dashboard from "./pages/Dashboard.vue";

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
    if (to.meta.requiresAuth) {
        try {
            const res = await fetch("http://localhost:5000/auth/status", {
                credentials: "include",
            });

            const data = await res.json();
            console.log(data.status);

            if (data.status) {
                next();
            } else {
                next("/log-in");
            }
        } catch (err) {
            console.log("Auth check failed", err);
            next("/log-in");
        }
    } else {
        next();
    }
});

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
