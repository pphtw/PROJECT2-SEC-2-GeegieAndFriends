<script setup>
import FilterButton from '../atoms/FilterButton.vue'
import { useSearchStore } from '@/stores/searchStore'

const searchStore = useSearchStore()
const { filterType } = searchStore
</script>

<template>
  <div class="h-fit flex gap-2 py-6 radioFilter">
    <FilterButton
      v-for="(filter, index) in filterType"
      :key="index"
      :index="index"
      :filterName="filter"
      :id="filter"
    />
  </div>
</template>

<style scoped></style>
