<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useFoodStore } from "../../stores/foodStore";
import { useGlobalStore } from "../../stores/globalStore";

const foodStore = useFoodStore();
const globalStore = useGlobalStore();

const handleClick = () => {
    foodStore.setControlWindow(true, "Create");
};

const currentDate = new Date().toISOString().split("T")[0];

const isCreatingAllowed = () => {
    if (currentDate !== globalStore.currentDay?.date) {
        return false;
    }
    return true;
};
</script>

<template>
    <div v-if="isCreatingAllowed()" class="fixed bottom-3 right-5">
        <button
            @click="handleClick"
            class="bg-avocado-500 flex items-center gap-1 text-white pl-3 pr-5 py-1 rounded-md shadow-md cursor-pointer"
        >
            <Icon icon="material-symbols:add-rounded" class="text-3xl" />
            <span class="text-xl">Add</span>
        </button>
    </div>
</template>
