<script setup>
import FilterButton from '../atoms/FilterButton.vue';

</script>
 
<template>
    <div class="flex gap-2 py-4 radioFilter">
        <FilterButton filterName="All"/>
        <FilterButton filterName="Playlists"/>
        <FilterButton filterName="Artists"/>
        <FilterButton filterName="Profile"/>
        <FilterButton filterName="Songs"/>
        <FilterButton filterName="Albums"/>
    </div>
</template>
 
<style scoped>
.radioFilter:checked + label{
    background-color: #C493E1;
}
</style>