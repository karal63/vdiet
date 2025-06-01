<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { RouterLink, useRoute } from "vue-router";
import { sidebarLinks } from "../constants/sidebarLinks";
import ProfileMenu from "./dashboard/ProfileMenu.vue";
import { onBeforeMount, onMounted, ref } from "vue";
import type { ProfileMenuExposed } from "../types/global";

const route = useRoute();

const profileMenuOpen = ref(false);
const menuComponentRef = ref<ProfileMenuExposed | null>(null);
const buttonRef = ref(null);

const toggleMenu = () => {
    profileMenuOpen.value = !profileMenuOpen.value;
};

const handleClickOutside = (e: MouseEvent) => {
    const menuEl = menuComponentRef.value?.menuRef;

    if (
        profileMenuOpen.value &&
        menuEl &&
        !menuEl.contains(e.target as Node) &&
        (e.target as Node) !== buttonRef.value
    ) {
        profileMenuOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onBeforeMount(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
    <div
        class="fixed left-3 top-0 h-full w-[70px] bg-mainLightBg flex items-center"
    >
        <div
            class="relative bg-avocado-100 h-[70%] w-full border border-avocado-300 rounded-full shadow-2xl"
        >
            <ul class="mt-4 relative z-10 flex flex-col gap-4">
                <li
                    v-for="link in sidebarLinks"
                    :key="link.path"
                    class="w-full flex justify-center"
                >
                    <RouterLink
                        :to="link.path"
                        class="flex flex-col items-center transition-all w-[90%]"
                    >
                        <Icon
                            v-if="route.path !== link.path"
                            :icon="link.icon"
                            class="px-[4px] rounded-xl text-avocado-700 hover:bg-avocado-200 w-10 h-10 transition-all"
                        />
                        <Icon
                            v-else
                            class="px-[4px] rounded-xl text-avocado-700 bg-avocado-200 w-10 h-10 transition-all"
                            :icon="link.activeIcon"
                        />

                        <p class="text-[.8rem] font-medium text-avocado-700">
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
                ref="buttonRef"
                @click="toggleMenu"
                class="w-10 h-10 bg-gradient-to-r from-avocado-200 to-avocado-500 rounded-full cursor-pointer"
            ></button>
            <ProfileMenu v-if="profileMenuOpen" ref="menuComponentRef" />
        </div>
    </div>
</template>
