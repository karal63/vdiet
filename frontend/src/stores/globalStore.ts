import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore("global", () => {
    const authKey = ref(null);
    const user = ref(null);

    return { authKey };
});
