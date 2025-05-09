import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import type { LoggedUser } from "../types/global";

axios.defaults.withCredentials = true;

export const useGlobalStore = defineStore("global", () => {
    const loggedUser = ref<LoggedUser | null>();

    const isAuthenticated = ref(false);

    const getLoggedUser = async () => {
        isLoading.value = true;
        try {
            const res = await axios.get("http://localhost:5000/auth/status");
            loggedUser.value = res.data.user;
        } catch {
            loggedUser.value = null;
        } finally {
            isLoading.value = false;
        }
    };

    const login = async (email: string, password: string) => {
        await axios.post("http://localhost:5000/login", { email, password });
        isAuthenticated.value = true;
    };

    const signup = async (email: string, password: string, name: string) => {
        await axios.post("http://localhost:5000/signup", {
            email,
            password,
            name,
        });
    };

    const refresh = async () => {
        await axios.post("http://localhost:5000/refresh");
        isAuthenticated.value = true;
        await getLoggedUser();
    };

    const logout = async () => {
        await axios.post("http://localhost:5000/logout");
        isAuthenticated.value = false;
    };

    const isLoading = ref<boolean>(true);

    return {
        isAuthenticated,
        login,
        signup,
        refresh,
        logout,
        isLoading,
        loggedUser,
        getLoggedUser,
    };
});
