<script setup>
import {reactive, ref} from "vue";
import {secToMin} from "@/lib/util";

const props = defineProps({
  audioElement: {
    type: Object,
    required: false,
    default: new Audio()
  }
})
const progressBarElement = ref(null)
const progressBar = reactive({
  barWidth: '0%',
  isClicked: false,
  currentTime: '00:00',
  duration: '00:00',
  boundingRect: new DOMRect(),
  newTime: 0,
  updateProgressBar: () => {
    progressBar.barWidth =
        (props.audioElement.currentTime / props.audioElement.duration) * 100 + '%'
  },
  updateTime: (e) => {
    const x = progressBar.validateX(e.clientX)
    progressBar.newTime =
        (x / progressBar.boundingRect.width) * props.audioElement.duration
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
const onLoadMetadataHandler = () => {
  props.audioElement.volume = 0.1
  progressBar.duration = secToMin(props.audioElement.duration)
  progressBar.currentTime = secToMin(props.audioElement.currentTime)
  progressBar.updateProgressBar()
}
const onTimeUpdateHandler = () => {
  progressBar.currentTime = secToMin(props.audioElement.currentTime)
  console.log(props.audioElement.currentTime)
  if (!progressBar.isClicked) {
    progressBar.updateProgressBar()
  }
}
const onProgressBarMouseMove = (e) => {
  if (progressBar.isClicked) {
    progressBar.updateTime(e)
  }
}
const onProgressBarMouseUp = (e) => {
  if (progressBar.isClicked) {
    progressBar.updateTime(e)
    props.audioElement.currentTime = progressBar.newTime
    progressBar.isClicked = false
  }
}
const onProgressBarMouseDown = (e) => {
  e.preventDefault()
  progressBar.isClicked = true
  progressBar.boundingRect = progressBarElement.value.getBoundingClientRect()
  progressBar.updateTime(e)
}
</script>

<template>
  <Teleport to="body"
            @progressBarMouseMove="(e) => onProgressBarMouseMove(e)"
            @progressBarMouseUp="(e) => onProgressBarMouseUp(e)">
  </Teleport>
  <Teleport to="#audio"
            @timeupdate="onTimeUpdateHandler"
            @loadedmetadata="onLoadMetadataHandler"/>
  <div class="overflow-clip">
    <div
        class="progress-bar self-center active:cursor-default"
        ref="progressBarElement"
        @mousedown="onProgressBarMouseDown"
    >
      <div
          class="progress-current"
          :style="{ width: progressBar.barWidth }"
      ></div>
    </div>
  </div>
</template>

<style scoped>

</style>