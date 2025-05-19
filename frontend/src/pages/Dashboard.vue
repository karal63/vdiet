<script setup lang="ts">
import { Icon } from "@iconify/vue";
import ControlPanel from "../components/dashboard/ControlPanel.vue";
import FoodControlWindow from "../components/dashboard/FoodControlWindow.vue";
import FoodSection from "../components/dashboard/FoodSection.vue";
import { useFoodStore } from "../stores/foodStore";
import { useGlobalStore } from "../stores/globalStore";
import { ref } from "vue";
import type { Day } from "../types/global";

const globalStore = useGlobalStore();
const foodStore = useFoodStore();

const currentDate = ref(new Date());

const navigateToDate = (dayValue: number) => {
    const newDate = new Date(currentDate.value);
    newDate.setDate(newDate.getDate() + dayValue);

    currentDate.value = newDate;

    const formatted = newDate.toISOString().split("T")[0];
    globalStore.currentDay = globalStore.fullHistory.find(
        (day: Day) => day.date === formatted
    );
};
</script>

<template>
    <div class="pl-[120px] pr-[40px] pt-4 h-[1000px] bg-mainLightBg">
        <div v-if="globalStore.isLoading">
            <h1 class="text-4xl bg-purple-500">Loading...</h1>
        </div>
        <div v-else class="flex justify-between items-center">
            <div>
                <p class="text-3xl font-black">
                    Hello, {{ globalStore.loggedUser?.username }}!
                </p>
                <div>cards etc...</div>
            </div>

            <div class="flex gap-2 items-center">
                <button
                    @click="() => navigateToDate(-1)"
                    class="text-avocado-600 cursor-pointer text-3xl"
                >
                    <Icon icon="ep:arrow-left-bold" />
                </button>
                <h1 class="text-lg">
                    {{ currentDate.toISOString().split("T")[0] }}
                </h1>
                <button
                    @click="() => navigateToDate(1)"
                    class="text-avocado-600 cursor-pointer text-3xl"
                >
                    <Icon icon="ep:arrow-right-bold" />
                </button>
            </div>
        </div>

        <FoodSection />
        <ControlPanel />
        <FoodControlWindow v-if="foodStore.isControlWindowOpen" />
    </div>
</template>
