<script setup>
import {computed, inject, reactive, ref} from 'vue'
import Timer from '@/components/UI/atoms/Timer.vue'
import { storeToRefs } from 'pinia'
import { useControllerStore } from '@/stores/controllerStore'
import { secToMin } from '@/lib/util'
const audioElement = inject('audioElement', new Audio())
const emit = defineEmits(['progressBarMouseMove', 'progressBarMouseUp'])
const controllerStore = useControllerStore()
const {time} = controllerStore

const progressBarElement = ref(null)
const progressBar = reactive({
  barWidth: '0%',
  isClicked: false,
  boundingRect: new DOMRect(),
  newTime: 0,
  updateTime: (e) => {
    const x = progressBar.validateX(e.clientX)
    progressBar.newTime =
      (x / progressBar.boundingRect.width) * audioElement.duration
    progressBar.barWidth = (x / progressBar.boundingRect.width) * 100 + '%'
  },
  validateX: (x) => {
    if (x < progressBar.boundingRect.left) {
      return 0
    } else if (x > progressBar.boundingRect.right) {
      return progressBar.boundingRect.width + 2
    } else {
      return x - progressBar.boundingRect.left
    }
  },
})
const progressBarWidth = computed(() => {
  return controllerStore.time.progress + "%";
});
const onProgressBarMouseDown = (e) => {
  e.preventDefault();
  progressBar.boundingRect = progressBarElement.value.getBoundingClientRect();
  progressBar.updateTime(e);
  controllerStore.time.isClicked = true;
};
const onProgressBarMouseMove = (e) => {
  if (controllerStore.time.isClicked) {
    progressBar.updateTime(e);
    emit('progressBarMouseMove', e);
  }
};

const onProgressBarMouseUp = (e) => {
  if (controllerStore.time.isClicked) {
    progressBar.updateTime(e);
    audioElement.currentTime = progressBar.newTime;
    controllerStore.time.isClicked = false;
    emit('progressBarMouseUp', e);
  }
};
</script>

<template>
  <div class="overflow-clip">
    <div
      class="progress-bar self-center active:cursor-default"
      ref="progressBarElement"
      @mousedown="onProgressBarMouseDown"
      @mouseup="onProgressBarMouseUp"
      @mousemove="onProgressBarMouseMove"
    >
      <div
        class="progress-current"
        :style="{ width: progressBarWidth  }"
      ></div>
    </div>
  </div>
  <div>
    <div class="flex justify-between w-full items-center">
      <Timer :time="time.currentTime" />
      <Timer :time="time.duration" />
    </div>
  </div>
</template>

<style scoped>
.progress-bar {
  height: 0.4em;
  width: 100%;
  top: -2em;
  bottom: -2em;
  cursor: pointer;
  background-color: #b9b9b9;
}

.progress-current {
  height: inherit;
  width: 0;
  background-color: #c493e1;
  border-radius: 0 2em 2em 0;
}
</style>
