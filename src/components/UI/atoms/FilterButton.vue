<script setup>
defineProps({
  index: Number,
  filterName: String,
  isSelected: Boolean,
})
</script>

<template>
  <div
    @click="$emit('setFilter', index)"
    :class="[isSelected ? 'bg-[#c493e1]' : 'bg-[#162750]']"
    class="text-white rounded-full py-1 px-2 self-center hover:bg-[#c493e1] transition ease-in-out"
  >
    {{ filterName }}
  </div>
</template>

<style scoped></style>
