<script setup>
import MusicName from '../atoms/MusicName.vue'
const props = defineProps({
  track: {
    type: Object,
  },
})
const { track } = props
</script>
<template>
  <div
    class="grow grid grid-rows-2 h-fit max-sm:w-full pl-3 sm:pl-5"
    draggable="false"
  >
    <MusicName :font-weight="3" text-size="xl">{{ track.name }}</MusicName>
    <MusicName :font-weight="2"> {{ track.artist }}</MusicName>
  </div>
</template>

<style scoped></style>
