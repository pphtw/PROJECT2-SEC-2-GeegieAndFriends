<script setup>
import { onBeforeMount, reactive, ref, provide } from 'vue'

// Components
import HomePage from '@/components/pages/HomePage.vue'
import SearchPage from '@/components/pages/SearchPage.vue'
import { getTrackIdList } from '@/lib/getData'
import { secToMin } from '@/lib/util'
import { useControllerStore } from '@/stores/controllerStore.js'
import { usePlaylistStore } from '@/stores/playlistStore'
import { storeToRefs } from 'pinia'
import { RouterView, RouterLink } from 'vue-router'

// Use Store
const playlistStore = usePlaylistStore()
const controllerStore = useControllerStore()

const { likedTracks } = storeToRefs(playlistStore)
const { currentTrack, q } = storeToRefs(controllerStore)

const {
  skipTrack,
  autoPlayPause,
  togglePlayPause,
  togglePlay,
  setQueue,
  initController,
} = controllerStore

//progress bar
const progressBar = reactive({
  barWidth: '0%',
  isClicked: false,
  currentTime: '00:00',
  duration: '00:00',
  boundingRect: new DOMRect(),
  newTime: 0,
  updateProgressBar: () => {
    progressBar.barWidth =
      (audioElement.value.currentTime / audioElement.value.duration) * 100 + '%'
  },
  updateTime: (e) => {
    const x = progressBar.validateX(e.clientX)
    progressBar.newTime =
      (x / progressBar.boundingRect.width) * audioElement.value.duration
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

//DOM Elements
const audioElement = ref(null)

// pass object
provide('audioElement', audioElement)
provide('progressBar', progressBar)

//event handler
const onLoadMetadataHandler = () => {
  audioElement.value.volume = 0.1
  progressBar.duration = secToMin(audioElement.value.duration)
  progressBar.currentTime = secToMin(audioElement.value.currentTime)
  progressBar.updateProgressBar()
}
const onTimeUpdateHandler = () => {
  progressBar.currentTime = secToMin(audioElement.value.currentTime)
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
    audioElement.value.currentTime = progressBar.newTime
    progressBar.isClicked = false
  }
}

// Hooks
onBeforeMount(() => {
  initController()
  // setQueue(getTrackIdList(1))
  // console.log(q.value.defautQueue)
  // likedTracks.value = JSON.parse(localStorage.getItem('likedTracks')) ?? []
})
</script>
<template>
  <audio
    ref="audioElement"
    :src="currentTrack.source"
    @timeupdate="onTimeUpdateHandler"
    @loadedmetadata="onLoadMetadataHandler"
    @ended="skipTrack()"
    @canplay="autoPlayPause(audioElement)"
  ></audio>
  <RouterView
    @progressBarMouseMove="(e) => onProgressBarMouseMove(e)"
    @progressBarMouseUp="(e) => onProgressBarMouseUp(e)"
    @autoPlayPause="autoPlayPause(audioElement)"
    @chooseTrack="(ms) => togglePlay(audioElement, ms)"
    @togglePlayPause="togglePlayPause"
    :isProgressBarClicked="progressBar.isClicked"
  />
</template>
