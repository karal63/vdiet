<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useFoodStore } from "../../stores/foodStore";

const store = useFoodStore();

const handleClick = () => {
    store.isControlWindowOpen = true;
};
</script>

<template>
    <div class="fixed bottom-3 right-5">
        <button
            @click="handleClick"
            class="bg-avocado-500 flex items-center gap-1 text-white pl-3 pr-5 py-1 rounded-md shadow-md cursor-pointer"
        >
            <Icon icon="material-symbols:add-rounded" class="text-3xl" />
            <span class="text-xl">Add</span>
        </button>
    </div>
</template>
