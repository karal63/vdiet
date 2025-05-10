<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { RouterLink, useRoute } from "vue-router";
import { sidebarLinks } from "../constants/sidebarLinks";

const route = useRoute();
</script>

<template>
    <div
        class="absolute left-3 top-0 h-full w-[70px] bg-mainLightBg flex items-center"
    >
        <div
            class="relative bg-mainLightBg h-[70%] w-full border border-mainBorder rounded-full shadow-2xl"
        >
            <ul class="mt-4 relative z-10 flex flex-col gap-2">
                <li
                    v-for="link in sidebarLinks"
                    class="w-full flex justify-center"
                >
                    <RouterLink
                        :to="link.path"
                        class="flex flex-col items-center transition-all w-[90%]"
                    >
                        <Icon
                            v-if="route.path !== link.path"
                            :icon="link.icon"
                            class="text-4xl rounded-xl text-avocado-600 hover:bg-avocado-100 w-10 h-10 transition-all"
                        />
                        <Icon
                            v-else
                            :icon="link.activeIcon"
                            class="text-4xl rounded-xl text-avocado-600 bg-avocado-100 w-10 h-10 transition-all"
                        />

                        <p class="text-[.8rem] text-avocado-600 font-medium">
                            {{ link.name }}
                        </p>
                    </RouterLink>
                </li>
            </ul>

            <!-- animation block -->
            <!-- <div
                class="absolute top-0 w-full h-[100px] transition-all duration-300 ease-in-out rounded-full bg-avocado-200"
            ></div> -->
        </div>

        <!-- profile button -->
        <div class="absolute bottom-4 left-0 w-full flex justify-center">
            <button
                class="w-10 h-10 bg-gradient-to-r from-avocado-200 to-avocado-500 rounded-full"
            ></button>
        </div>
    </div>
</template>
