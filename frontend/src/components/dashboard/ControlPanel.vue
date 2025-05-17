<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useGlobalStore } from "../../stores/globalStore";

// TODO: make example adding food to the current day and put it in the database
// use addDay function or create a new one that is for updating items
// send items through post request, in the server get history find certain day and update it
// overwrite array in database

const store = useGlobalStore();

const handleClick = () => {
    store.currentDay.food = [
        {
            id: 3,
            category: "Lunch",
            name: "Meat with rice",
        },
    ];

    store.updateDay(store.currentDay);
};
</script>

<template>
    <div class="absolute bottom-3 right-5">
        <button
            @click="handleClick"
            class="bg-avocado-500 flex items-center gap-1 text-white pl-3 pr-5 py-1 rounded-md shadow-md cursor-pointer"
        >
            <Icon icon="material-symbols:add-rounded" class="text-3xl" />
            <span class="text-xl">Add</span>
        </button>
    </div>
</template>
