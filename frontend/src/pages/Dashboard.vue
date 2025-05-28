<script setup lang="ts">
import { Icon } from "@iconify/vue";
import ControlPanel from "../components/dashboard/ControlPanel.vue";
import FoodControlWindow from "../components/dashboard/FoodControlWindow.vue";
import FoodSection from "../components/dashboard/FoodSection.vue";
import { useFoodStore } from "../stores/foodStore";
import { useGlobalStore } from "../stores/globalStore";
import { computed, onMounted, ref, watch } from "vue";
import type { Day } from "../types/global";
import Summary from "../components/dashboard/Summary.vue";
import AiChat from "../components/dashboard/AiChat.vue";

const globalStore = useGlobalStore();
const foodStore = useFoodStore();

const globalCurrentDate = ref(new Date());

const currentDate = ref(new Date());

const navigateToDate = (dayValue: number) => {
    const newDate = new Date(currentDate.value);

    newDate.setDate(newDate.getDate() + dayValue);
    const formatted = newDate.toISOString().split("T")[0];

    if (newDate > globalCurrentDate.value) {
        return;
    }

    const matchingDay = globalStore.fullHistory.find(
        (day: Day) => day.date === formatted
    );

    currentDate.value = newDate;
    globalStore.currentDay = matchingDay;
};

const formattedDate = computed(() => {
    const parts = currentDate.value
        .toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        .split(" ");

    return `${parts[0]} ${parts[1]}, ${parts[2]}`;
});
</script>

<template>
    <div class="pl-[120px] pr-[40px] pt-4 pb-10 bg-mainLightBg">
        <div v-if="globalStore.isLoading">
            <h1 class="text-4xl bg-purple-500">Loading...</h1>
        </div>
        <div v-else class="flex justify-between items-center">
            <div>
                <p class="text-3xl font-black">
                    Hello, {{ globalStore.loggedUser?.username }}!
                </p>
            </div>

            <div class="flex gap-2 items-center">
                <button
                    @click="() => navigateToDate(-1)"
                    class="text-avocado-600 cursor-pointer text-3xl"
                >
                    <Icon icon="ep:arrow-left" />
                </button>
                <h1 class="text-lg">
                    {{ formattedDate }}
                </h1>
                <button
                    @click="() => navigateToDate(1)"
                    class="text-avocado-600 cursor-pointer text-3xl"
                >
                    <Icon icon="ep:arrow-right" />
                </button>
            </div>
        </div>

        <Summary />
        <FoodSection />
        <ControlPanel />
        <FoodControlWindow />
        <AiChat />
    </div>
</template>
