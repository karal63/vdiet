<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useFoodStore } from "../../stores/foodStore";
import MealForm from "./MealForm.vue";
import { onMounted, onUnmounted, useTemplateRef } from "vue";

const store = useFoodStore();

const modalRef = useTemplateRef("modalRef");

const handleClickOutside = (e: Event) => {
    if (e.target === modalRef.value) {
        store.hideControlWindow();
    }
};
onMounted(() => {
    document.addEventListener("click", (e) => handleClickOutside(e));
});

onUnmounted(() => {
    removeEventListener("click", (e) => handleClickOutside(e));
});
</script>

<template>
    <div
        ref="modalRef"
        class="fixed left-0 top-0 w-full h-full flex items-center justify-center bg-black/50 z-30"
    >
        <div class="flex gap-2">
            <div
                class="bg-white rounded-xl w-full px-8 pt-6 pb-8 shadow-mainShadow"
            >
                <h1 class="text-3xl font-semibold">New meal</h1>

                <div class="flex gap-5 mt-7">
                    <div class="w-full">
                        <MealForm />
                    </div>
                </div>
            </div>

            <div class="max-w-max">
                <button
                    @click="store.hideControlWindow()"
                    class="text-2xl w-10 h-10 rounded-full flex-center bg-grayDull text-white shadow-2xl hover:bg-grayDull/90 transition-all cursor-pointer"
                >
                    <Icon icon="material-symbols:close-rounded" />
                </button>
            </div>
        </div>
    </div>
</template>
