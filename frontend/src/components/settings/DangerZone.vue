<script setup lang="ts"></script>

<template>
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
</template>
