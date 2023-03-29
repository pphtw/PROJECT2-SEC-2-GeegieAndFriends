<script setup>
const props = defineProps({
  track: {
    type: Object,
  },
})
const { track } = props
</script>

<template>
  <div class="h-full max-sm:w-24 aspect-square">
    <img class="h-full aspect-square" alt="Song Cover" :src="track?.cover" />
  </div>
</template>

<style scoped></style>
