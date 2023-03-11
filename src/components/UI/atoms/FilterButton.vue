<script setup>
import { ref } from 'vue';

defineProps({
    filterName: String
})
</script>
 
<template>
    <input type="radio"
        class="hidden"
        name="filterType"
        :id="`${filterName}`"
        :value="`${filterName}`"
    >
    <label 
        :for="`${filterName}`"
        class="bg-[#162750] text-white rounded-full py-1 px-2 self-center hover:bg-[#D4AFD9] transition ease-in-out">
        {{ filterName }}
    </label>
</template>
 
<style scoped>
</style>