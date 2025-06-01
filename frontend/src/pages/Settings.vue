<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useFoodStore } from "../stores/foodStore";
import GoalsSection from "../components/settings/GoalsSection.vue";
import DangerZone from "../components/settings/DangerZone.vue";

const foodStore = useFoodStore();
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

                <GoalsSection />

                <!-- danger zone -->
                <DangerZone />
            </form>
        </div>
    </div>
</template>
