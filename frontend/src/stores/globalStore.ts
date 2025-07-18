import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import type { Day, Error, LoggedUser, Water } from "../types/global";
import { v4 as uuidv4 } from "uuid";
import.meta.env.AI_KEY;

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
        } catch (err: any) {
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

    const addDay = async () => {
        const today = new Date().toISOString().split("T")[0];
        await axios.post("http://localhost:5000/users/history", {
            today,
        });
    };

    const getDay = async () => {
        console.log("getting day");
        const res = await axios.get("http://localhost:5000/users/history");
        fullHistory.value = res.data.history;

        const today = new Date().toISOString().split("T")[0];
        currentDay.value = res.data.history.find(
            (day: Day) => day.date === today
        );
    };

    const updateDay = async (globalCurrentDay: Day) => {
        const today = new Date().toISOString().split("T")[0];
        await axios.put("http://localhost:5000/users/history", {
            today,
            globalCurrentDay,
        });
    };

    const currentDay = ref<Day | undefined>({
        date: "",
        food: [],
        waterIntake: [],
        goals: {
            caloriesGoal: 0,
            proteinGoal: 0,
            carbohydratesGoal: 0,
        },
    });

    const fullHistory = ref<Day[]>([]);

    const addWaterIntake = (newWaterIntake: Water) => {
        if (!currentDay.value) return;

        const currentWater = currentDay.value.waterIntake || [];

        currentDay.value.waterIntake = [
            ...currentWater,
            {
                id: uuidv4(),
                ...newWaterIntake,
            },
        ];
    };

    const selectedWaterIntakes = ref<Water[]>([]);

    const deleteWaterIntakes = () => {
        if (!currentDay.value?.waterIntake) return;
        const newWaterIntake = currentDay.value?.waterIntake.filter(
            (intake) =>
                !selectedWaterIntakes.value.some(
                    (selected) => selected.id === intake.id
                )
        );

        currentDay.value.waterIntake = newWaterIntake;
        selectedWaterIntakes.value = [];
    };

    const isProtectedDate = () => {
        const currentDate = new Date().toISOString().split("T")[0];
        return currentDay.value?.date === currentDate;
    };

    // const isAiChatOpen = ref(false);

    // const aiChatHistory = ref([]);

    // const sendMessage = async (userInput: string) => {
    //     const key = "123";
    //     const url = "https://api.openai.com/v1/chat/completions";

    //     const headers = {
    //         Authorization: `Bearer ${key}`,
    //         "Content-Type": "application/json",
    //     };
    //     const data = {
    //         body: JSON.stringify({
    //             model: "gpt-4o",
    //             message: [{ role: "user", content: userInput }],
    //         }),
    //     };
    //     const resAi = await axios.post(url, data, headers);
    //     console.log(resAi);
    // };

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
        addDay,
        getDay,
        history,
        currentDay,
        updateDay,
        fullHistory,
        addWaterIntake,
        isProtectedDate,
        selectedWaterIntakes,
        deleteWaterIntakes,
        // isAiChatOpen,
        // aiChatHistory,
        // sendMessage,
    };
});
