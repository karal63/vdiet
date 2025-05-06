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

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
