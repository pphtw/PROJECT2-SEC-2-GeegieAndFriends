<script setup>
import SearchIcon from '../atoms/SearchPageButton.vue';
</script>
 
<template>
<div class="h-10 flex rounded-full bg-[#E5E5E5] gap-3 px-3 py-1.5">
        <SearchIcon 
            stroke="black"
            class="flex-none self-center"
        />
        <input
            class="bg-transparent flex-1" 
            type="text w-full" 
            placeholder="What do you want to listen to?"/>
        </div>
</template>
 
<style scoped>

</style>