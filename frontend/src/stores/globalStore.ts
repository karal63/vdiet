import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

axios.defaults.withCredentials = true;

export const useGlobalStore = defineStore("global", () => {
    const isAuthenticated = ref(false);

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
    };

    const logout = () => {
        isAuthenticated.value = false;
    };

    const isLoading = ref<boolean>(false);

    return { isAuthenticated, login, signup, refresh, isLoading };
});
