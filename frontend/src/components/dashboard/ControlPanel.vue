<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useFoodStore } from "../../stores/foodStore";
import { useGlobalStore } from "../../stores/globalStore";
import { computed, onMounted, onUnmounted, ref, watchEffect } from "vue";

const foodStore = useFoodStore();
const globalStore = useGlobalStore();

const timeoutId = ref();
const isAiMenuOpen = ref(false);

const handleClick = () => {
    foodStore.setControlWindow(true, "Create");
};

const currentDate = new Date().toISOString().split("T")[0];

const isCreatingAllowed = computed(() => {
    const loadedDate = globalStore.currentDay?.date;
    if (!loadedDate) return false;

    if (currentDate !== loadedDate) {
        return false;
    }

    return true;
});

onMounted(() => {
    timeoutId.value = setTimeout(() => {
        isAiMenuOpen.value = true;
    }, 1000);
});

onUnmounted(() => {
    clearTimeout(timeoutId.value);
});
</script>

<template>
    <div class="fixed bottom-3 right-5 flex gap-3 flex-col items-end">
        <div class="flex flex-col gap-4 items-end">
            <!-- <div
                class="relative bg-avocado-200 border border-mainBorder w-[200px] px-3 py-2 rounded-md shadow-2xl transition-all after:w-3 after:h-3 after:absolute after:right-5 after:-bottom-[6px] after:transform after:rotate-45 after:rounded-[2px] after:-z-10 after:bg-gray-800"
                :class="isAiMenuOpen ? 'right-0' : '-right-[300px]'"
            >
                <button
                    @click="isAiMenuOpen = false"
                    class="absolute right-1 top-1 text-lg cursor-pointer"
                >
                    <Icon icon="material-symbols:close-rounded" />
                </button>
                <p class="text-md">Ask AI Assistant</p>
            </div>
            <button
                @click="globalStore.isAiChatOpen = true"
                class="w-12 h-12 bg-gray-800 flex-center text-white rounded-full text-4xl cursor-pointer"
            >
                <Icon icon="hugeicons:ai-magic" />
            </button> -->
        </div>

        <button
            v-if="isCreatingAllowed"
            @click="handleClick"
            class="bg-avocado-500 flex items-center gap-1 text-white pl-3 pr-5 py-1 rounded-md shadow-md cursor-pointer"
        >
            <Icon icon="material-symbols:add-rounded" class="text-3xl" />
            <span class="text-xl">Add</span>
        </button>
    </div>
</template>
