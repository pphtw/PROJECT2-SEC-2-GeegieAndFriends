<script setup>
import { ref } from 'vue'
import { useSearchStore } from '../../../stores/searchStore.js'
import { storeToRefs } from 'pinia'

const searchStore = useSearchStore()
const { selectedFilterIndex } = storeToRefs(searchStore)

defineProps({
  index: Number,
  filterName: String,
})
</script>

<template>
  <div
    @click="selectedFilterIndex = index"
    :class="[index === selectedFilterIndex ? 'bg-[#c493e1]' : 'bg-[#162750]']"
    class="text-white rounded-full py-1 px-2 self-center hover:bg-[#c493e1] transition ease-in-out"
  >
    {{ filterName }}
  </div>
</template>

<style scoped></style>
