<script setup>
import { ref } from 'vue'
import Timer from '@/components/UI/atoms/Timer.vue'
import { storeToRefs } from 'pinia'
import { useControllerStore } from '@/stores/controllerStore'
import { secToMin } from '@/lib/util'

// Definitions
const emit = defineEmits(['progressBarMouseMove', 'progressBarMouseUp'])
const controllerStore = useControllerStore()
const { progressBar } = storeToRefs(controllerStore)

// DOM Elements
const progressBarElement = ref(null)

// Event Handlers
const onProgressBarMouseDown = (e) => {
  e.preventDefault()
  progressBar.value.boundingRect =
    progressBarElement.value.getBoundingClientRect()
  progressBar.value.updateProgress(e)
  progressBar.value.isClicked = true
}
</script>

<template>
  <div
    class="progress-bar self-center active:cursor-default"
    ref="progressBarElement"
    @mousedown="onProgressBarMouseDown"
  >
    <div class="progress-current" :style="{ width: progressBar.width }"></div>
  </div>
  <div>
    <div class="flex justify-between w-full items-center">
      <Timer :time="secToMin(progressBar.currentTime)" />
      <Timer :time="secToMin(progressBar.duration)" />
    </div>
  </div>
</template>

<style scoped>
.progress-bar {
  height: 0.3rem;
  width: 100%;
  cursor: pointer;
  background-color: #b9b9b9;
}

.progress-current {
  height: inherit;
  width: 0;
  background-color: #c493e1;
  border-radius: 0 9999px 9999px 0;
}
</style>
