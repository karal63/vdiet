<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, ref, watchEffect } from "vue";
import { useGlobalStore } from "../../stores/globalStore";

const foodStore = useGlobalStore();
const globalStore = useGlobalStore();

const water = {
    amountMl: 280,
};

const totalLiters = computed(() => {
    if (!globalStore.currentDay?.waterIntake) return;

    return (
        globalStore.currentDay?.waterIntake.reduce(
            (sum, entry) => sum + entry.amountMl,
            0
        ) / 1000
    );
});
</script>

<template>
    <div
        class="h-full w-1/2 border border-mainBorder rounded-xl drop-shadow-xl bg-gray-50 p-4 flex flex-col justify-between"
    >
        <div>
            <div class="flex items-center justify-between">
                <h1 class="text-lg">Water intake</h1>
                <p>{{ totalLiters }}l/3l</p>
            </div>

            <div class="mt-2 grid grid-cols-8 gap-4 place-items-center">
                <button
                    v-for="water in foodStore.currentDay?.waterIntake"
                    class="text-2xl hover:text-avocado-600 transition-all cursor-pointer p-1 rounded-md active:bg-avocado-200"
                >
                    <Icon icon="circum:glass" />
                </button>
                <!-- add button -->
                <button
                    @click="() => globalStore.addWaterIntake(water)"
                    class="text-3xl relative max-w-max text-secondary cursor-pointer"
                >
                    <Icon icon="material-symbols:add-rounded" />
                </button>
            </div>
        </div>

        <div class="flex items-center justify-end">
            <button>Delete</button>
        </div>
    </div>
</template>
