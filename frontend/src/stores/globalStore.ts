import { defineStore } from "pinia";
import { ref } from "vue";
import type { FetchedUser } from "../types/global";

export const useGlobalStore = defineStore("global", () => {
    const user = ref<FetchedUser>({
        userId: 0,
        username: "",
        iat: 0,
        exp: 0,
    });

    return { user };
});
