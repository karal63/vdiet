<script setup lang="ts">
import SimpleNavbar from "../components/SimpleNavbar.vue";
</script>

<template>
    <div class="bg-mainLightBg h-[100vh]">
        <SimpleNavbar />

        <div class="mt-40 flex flex-col items-center">
            <p class="text-2xl w-[400px] text-center">
                Introducing Vdiet, the cutting-edge fitness app designed to
                revolutionize your health journey.
            </p>
            <RouterLink to="/login" class="block mt-10">
                <a
                    class="bg-avocado-500 px-10 py-2 text-xl rounded-xl text-white hover:bg-avocado-600"
                    >Log in</a
                >
            </RouterLink>
        </div>

        <footer class="absolute w-full flex justify-center bottom-10 left-0">
            <p>©2025 Vdiet. All rights reserved.</p>
        </footer>
    </div>
</template>
