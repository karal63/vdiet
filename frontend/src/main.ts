import { createApp } from "vue";
import "./style.css";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

// pages
import App from "./App.vue";
import SignIn from "./pages/SignIn.vue";

const routes = [
    {
        path: "/sign-in",
        component: SignIn,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
