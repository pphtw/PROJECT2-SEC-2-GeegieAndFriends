<script setup>
import FilterButton from '../atoms/FilterButton.vue'

const filterType = ['All', 'Playlists', 'Profile', 'Artists', 'Songs', 'Albums']

const props = defineProps({
  selectedFilterIndex: Number,
})
</script>

<template>
  <div class="h-fit flex gap-2 py-6 radioFilter">
    <FilterButton
      @setFilter="$emit('setFilter', index)"
      v-for="(filter, index) in filterType"
      :key="index"
      :index="index"
      :filterName="filter"
      :id="filter"
      :isSelected="selectedFilterIndex === index"
    />
  </div>
</template>

<style scoped></style>
