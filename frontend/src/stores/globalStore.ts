import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import type { Error, LoggedUser } from "../types/global";

axios.defaults.withCredentials = true;

export const useGlobalStore = defineStore("global", () => {
    const loggedUser = ref<LoggedUser | null>();

    const isAuthenticated = ref(false);
    const error = ref<Error>({
        show: false,
        text: "",
    });

    const getLoggedUser = async () => {
        isLoading.value = true;
        try {
            const res = await axios.get("http://localhost:5000/auth/status");
            if (res.status === 401) return (error.value = res.data);
            loggedUser.value = res.data.user;
        } catch {
            loggedUser.value = null;
        } finally {
            isLoading.value = false;
        }
    };

    const login = async (email: string, password: string) => {
        try {
            await axios.post("http://localhost:5000/login", {
                email,
                password,
            });
            isAuthenticated.value = true;
        } catch (err) {
            setError(true, err.response.data.message);
        }
    };

    const signup = async (email: string, password: string, name: string) => {
        await axios.post("http://localhost:5000/signup", {
            email,
            password,
            name,
        });
    };

    const refresh = async () => {
        // i cant make here trycatch block because then i t doesnt move me back when i try to navigate to the dashboard
        await axios.post("http://localhost:5000/refresh");
        isAuthenticated.value = true;
        await getLoggedUser();
    };

    const logout = async () => {
        await axios.post("http://localhost:5000/logout");
        isAuthenticated.value = false;
    };

    const isLoading = ref<boolean>(true);

    const setError = (show: boolean, text: string) => {
        error.value = {
            show,
            text,
        };
    };

    return {
        isAuthenticated,
        login,
        signup,
        refresh,
        logout,
        isLoading,
        loggedUser,
        getLoggedUser,
        error,
        setError,
    };
});
