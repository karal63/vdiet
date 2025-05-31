<script setup lang="ts">
import { ref } from "vue";
import { useGlobalStore } from "../../stores/globalStore";
import { Icon } from "@iconify/vue";
import { RouterLink } from "vue-router";

const store = useGlobalStore();

const menuRef = ref<HTMLElement | null>(null);

defineExpose({
    menuRef,
});
</script>

<template>
    <div
        ref="menuRef"
        class="absolute bg-white left-[120%] bottom-0 border border-mainBorder w-[200px] rounded-xl shadow-2xl"
    >
        <ul class="">
            <li>
                <RouterLink
                    to="/settings"
                    class="py-2 w-full px-5 flex items-center justify-end gap-4 cursor-pointer rounded-xl hover:bg-avocado-100 transition-all"
                >
                    Settings
                    <Icon icon="hugeicons:settings-02" class="text-2xl" />
                </RouterLink>
            </li>
            <li>
                <button
                    @click="store.logout"
                    class="py-2 w-full px-5 flex items-center justify-end gap-4 cursor-pointer rounded-xl hover:bg-avocado-100 transition-all"
                >
                    Log out
                    <Icon icon="mi:log-out" class="text-2xl" />
                </button>
            </li>
        </ul>
    </div>
</template>
