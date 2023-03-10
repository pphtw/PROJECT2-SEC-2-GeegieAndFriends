<script setup>
const props = defineProps({
  track: {
    type: Object,
  },
})
const { track } = props
</script>
<template>
  <div class="grow grid grid-rows-2 h-fit max-sm:w-full pl-3 sm:pl-5">
    <h1 class="row-span-1 text-xl font-bold truncate">
      {{ track.name }}
    </h1>
    <h1 class="row-span-1 font-semibold truncate" :id="track.trackId">
      {{ track.artist }}
    </h1>
  </div>
</template>

<style scoped></style>
