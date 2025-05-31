<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useFoodStore } from "../stores/foodStore";

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

                <div>
                    <h1 class="font-semibold text-xl mb-2 text-secondary">
                        Your goals:
                    </h1>
                    <div class="border border-mainBorder rounded-md p-4">
                        <div class="flex flex-col gap-4">
                            <div class="flex items-center gap-5">
                                <label class="text-lg">Calories:</label>
                                <div class="flex gap-2 items-center">
                                    <input
                                        v-model="foodStore.caloriesGoal"
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

                            <div class="flex items-center gap-5">
                                <label class="text-lg">Protein:</label>
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

                            <div class="flex items-center gap-5">
                                <label class="text-lg">Carbohydrates:</label>
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
                        </div>
                    </div>
                </div>

                <!-- danger zone -->
                <div class="mt-5">
                    <h1 class="font-semibold text-xl mb-2">Danger zone:</h1>
                    <div class="border border-red-700 rounded-md p-4">
                        <div class="flex flex-col gap-4">
                            <div class="flex items-center justify-between">
                                <label class="text-lg">Delete account:</label>
                                <div class="flex gap-2 items-center">
                                    <button
                                        @click.prevent
                                        class="text-md text-red-700 font-semibold cursor-pointer bg-gray-200 px-4 py-1 rounded-md border-mainBorder"
                                    >
                                        Delete account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
