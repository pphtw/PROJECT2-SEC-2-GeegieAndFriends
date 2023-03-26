<script setup>
import { useControllerStore } from '@/stores/controllerStore'

// Use Store
const controllerStore = useControllerStore()

const { chooseTrack, skipTrack, toggleShuffle } = controllerStore

// Definition
const emit = defineEmits(['chooseTrack', 'autoPlayPause'])
const props = defineProps({
  contentStyle: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <div
    class="w-full h-screen flex flex-row bg-[#162750]"
    @keyup.right="skipTrack"
    @keyup.left="skipTrack(false)"
    @keyup.space="$emit('togglePlayPause')"
    @keyup="toggleShuffle"
    tabindex="-1"
  >
    <div
      class="container-gradient w-full h-full px-[4vw] py-8 gap-y-8 gap-x-[4vw] grid"
      :class="contentStyle"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
