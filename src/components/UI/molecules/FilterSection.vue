<script setup>
import { ref } from 'vue'
import FilterButton from '../atoms/FilterButton.vue'
import { useSearchStore } from '../../../stores/searchStore.js'
import { storeToRefs } from 'pinia'

const searchStore = useSearchStore()
const { filterType } = searchStore
</script>

<template>
  <div class="flex gap-2 py-4 radioFilter">
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
