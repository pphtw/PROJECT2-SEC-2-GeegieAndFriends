<script setup>
import NavigationBar from '@/components/UI/organisms/NavigationBar.vue'

import { useControllerStore } from '@/stores/controllerStore'

// Use Store
const controllerStore = useControllerStore()

const { chooseTrack, skipTrack, toggleShuffle } = controllerStore

// Definition
const emit = defineEmits([
  'progressBarMouseMove',
  'progressBarMouseUp',
  'chooseTrack',
  'autoPlayPause',
])
const props = defineProps({
  isProgressBarClicked: {
    type: Boolean,
    required: true,
  },
  contentStyle: {
    type: String,
    required: false,
  },
})

// Handlers
const onMouseMove = (e) => {
  if (props.isProgressBarClicked) {
    emit('progressBarMouseMove', e)
  }
}
const onMouseUp = (e) => {
  emit('progressBarMouseUp', e)
}
</script>

<template>
  <div
    class="w-full h-screen flex flex-row bg-[#162750]"
    @keyup.right="skipTrack"
    @keyup.left="skipTrack(false)"
    @keyup.space="$emit('togglePlayPause')"
    @keyup="toggleShuffle"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
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
