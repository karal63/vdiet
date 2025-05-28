<script setup lang="ts">
import SimpleNavbar from "../components/SimpleNavbar.vue";
</script>

<template>
    <div class="bg-mainLightBg h-[100vh]">
        <SimpleNavbar />

        <div class="mt-20 ml-40">
            <p class="text-2xl w-[400px]">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos,
                fuga. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Veniam laudantium sequi error fugit? Optio odio sint
                necessitatibus nobis possimus amet?
            </p>
            <RouterLink to="/login" class="block mt-5">
                <a
                    class="bg-avocado-500 px-5 py-2 text-xl rounded-xl text-white hover:bg-avocado-600"
                    >Log in</a
                >
            </RouterLink>
        </div>
    </div>
</template>
