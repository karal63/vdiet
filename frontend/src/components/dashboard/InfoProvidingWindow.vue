<script setup lang="ts"></script>

<template>
    <div
        class="z-50 absolute top-0 left-0 w-full h-full bg-black/20 flex items-center justify-center"
    >
        <div
            class="relative bg-mainLightBg w-[30%] h-[70%] rounded-xl py-6 px-6 shadow-2xl"
        >
            <h1 class="text-2xl font-bold">Hello new user.</h1>
            <p class="text-gray-400">
                For comfortable app using, we need your information.
            </p>

            <form>
                <div class="flex flex-col mt-4">
                    <label for="">Age</label>
                    <input type="text" class="border border-mainBorder" />
                </div>
            </form>

            <div
                class="absolute bottom-4 right-4 text-white bg-avocado-500 px-4 py-1 rounded-lg text-lg"
            >
                Next
            </div>
        </div>
    </div>
</template>
