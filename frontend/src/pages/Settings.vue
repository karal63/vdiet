<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useFoodStore } from "../stores/foodStore";
import GoalsSection from "../components/settings/GoalsSection.vue";
import DangerZone from "../components/settings/DangerZone.vue";
import { ref, watch, watchEffect } from "vue";
import { useGlobalStore } from "../stores/globalStore";

const globalStore = useGlobalStore();

const userSettings = ref({
    username: "",
    goals: {
        caloriesGoal: 0,
        proteinGoal: 0,
        carbohydratesGoal: 0,
    },
});

watch(
    () => globalStore.currentDay?.goals,
    () => {
        console.log(globalStore.currentDay?.goals.caloriesGoal);
        if (!globalStore.currentDay?.goals) return;
        userSettings.value.goals = {
            caloriesGoal: globalStore.currentDay?.goals.caloriesGoal,
            proteinGoal: globalStore.currentDay?.goals.proteinGoal,
            carbohydratesGoal: globalStore.currentDay?.goals.carbohydratesGoal,
        };
    },
    { deep: true, immediate: true }
);

const isEditting = ref(false);

const handleSubmit = () => {
    if (!globalStore.currentDay) return;
    console.log("applying new settings");
    globalStore.currentDay.goals = userSettings.value.goals;
};

watch(
    () => userSettings.value.goals,
    () => {
        isEditting.value = true;
    },
    { deep: true }
);
</script>

<template>
    <div class="bg-mainLightBg">
        <div class="pl-[170px] pr-[300px]">
            <h1 class="font-black text-4xl pt-5">Settings</h1>

            <form class="mt-16 flex flex-col gap-5">
                <!-- name -->
                <div class="flex items-center gap-5">
                    <label class="text-lg">User name:</label>
                    <div class="flex gap-2 items-center">
                        <input
                            v-model="userSettings.username"
                            type="text"
                            class="border rounded-md outline-none border-mainBorder px-3 py-1"
                        />
                        <button
                            @click.prevent
                            class="text-lg text-secondary cursor-pointer"
                        >
                            <Icon
                                icon="material-symbols:edit-outline-rounded"
                            />
                        </button>
                    </div>
                </div>

                <GoalsSection v-model:goals="userSettings.goals" />

                <div class="flex justify-end items-center">
                    <button
                        @click.prevent="handleSubmit"
                        class="px-4 py-1 text-lg rounded-md text-white"
                        :class="isEditting ? 'bg-avocado-500' : 'bg-gray-200'"
                    >
                        Save
                    </button>
                </div>

                <!-- danger zone -->
                <DangerZone />
            </form>
        </div>
    </div>
</template>
