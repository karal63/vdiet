<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useGlobalStore } from "../../stores/globalStore";

const store = useGlobalStore();
</script>

<template>
    <div class="absolute bottom-3 right-5">
        <button
            @click="store.addDay"
            class="bg-avocado-500 flex items-center gap-1 text-white pl-3 pr-5 py-1 rounded-md shadow-md cursor-pointer"
        >
            <Icon icon="material-symbols:add-rounded" class="text-3xl" />
            <span class="text-xl">Add</span>
        </button>
    </div>
</template>
