<script setup>
import { ref } from 'vue';
import FilterButton from '../atoms/FilterButton.vue';

const filterType = ['All', 'Playlists', 'Profile', 'Artists', 'Song', 'Albums']

const filterHandler = (e) => {

}

</script>
 
<template>
    <div 
    class="flex gap-2 py-4 radioFilter"
    v-for="(filter, index) in filterType"
    :key="index">
        <!-- manual -->
        <!-- <FilterButton filterName="All"/>
        <FilterButton filterName="Playlists"/>
        <FilterButton filterName="Artists"/>
        <FilterButton filterName="Profile"/>
        <FilterButton filterName="Songs"/>
        <FilterButton filterName="Albums"/> -->
        <FilterButton 
        :class="isSelected ? 'selectedFilter':''"
        :filterName="filter" 
        :id="filter" 
        @filterEvent="filterHandler"/>
    </div>
</template>
 
<style scoped>
.selectedFilter{
    background-color: #C493E1;
}
</style>