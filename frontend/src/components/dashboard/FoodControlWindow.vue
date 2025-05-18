<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useFoodStore } from "../../stores/foodStore";
import SearchMeal from "./SearchMeal.vue";
import MealForm from "./MealForm.vue";
import { onMounted, onUnmounted, useTemplateRef } from "vue";

const store = useFoodStore();

const modalRef = useTemplateRef("modalRef");

const handleClickOutside = (e: Event) => {
    if (e.target === modalRef.value) {
        store.isControlWindowOpen = false;
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
        class="absolute left-0 top-0 w-full h-full flex items-center justify-center bg-black/50 z-30"
    >
        <div class="w-[70%] h-[75%] flex gap-2">
            <div class="bg-white shadow-2xl rounded-3xl w-full px-8 py-6">
                <h1 class="text-3xl font-semibold">Drafting a new meal</h1>

                <div class="flex gap-5">
                    <div class="w-1/2">
                        <MealForm />
                    </div>

                    <div class="w-1/2">
                        <SearchMeal />
                    </div>
                </div>
            </div>

            <div class="max-w-max">
                <button
                    @click="store.isControlWindowOpen = false"
                    class="text-2xl w-10 h-10 rounded-full flex-center bg-grayDull text-white shadow-2xl hover:bg-grayDull/90 transition-all cursor-pointer"
                >
                    <Icon icon="material-symbols:close-rounded" />
                </button>
            </div>
        </div>
    </div>
</template>
