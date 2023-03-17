<script setup>
import { ref } from 'vue'
import { useSearchStore } from '../../../stores/searchStore.js'
import { storeToRefs } from 'pinia'

const searchStore = useSearchStore()
const { selectedFilter } = storeToRefs(searchStore)

defineProps({
  index: Number,
  filterName: String,
})
</script>

<template>
  <div
    @click="selectedFilter = index"
    :class="[index === selectedFilter ? 'bg-[#c493e1]' : 'bg-[#162750]']"
    class="text-white rounded-full py-1 px-2 self-center hover:bg-[#c493e1] transition ease-in-out"
  >
    {{ filterName }}
  </div>
</template>

<style scoped></style>
