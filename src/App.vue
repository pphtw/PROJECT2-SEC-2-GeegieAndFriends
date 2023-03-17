<script setup>
import { onBeforeMount, reactive, ref, provide } from 'vue'

// Components
import HomePage from '@/components/pages/HomePage.vue'
import SearchPage from '@/components/pages/SearchPage.vue'
import { getPlaylist, getTrack, getTrackIdList } from '@/lib/getData'
import { secToMin } from '@/lib/util'
import { useControllerStore } from '@/stores/controllerStore.js'
import { usePlaylistStore } from '@/stores/usePlaylistStore'
import { storeToRefs } from 'pinia'

// Use Store
const playlistStore = usePlaylistStore()
const controllerStore = useControllerStore()

const { likedTracks, currentTrack } = storeToRefs(playlistStore)

const { q } = storeToRefs(controllerStore)
const { skipTrack, autoPlayPause, togglePlayPause } = controllerStore

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
    // clientX is a property of the event object in JavaScript
    // progressBar.boundingRect.width = width of progress bar
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

const togglePlay = (ms = 0) => {
  setTimeout(() => {
    audioElement.value.play()
  }, ms)
}

// Hooks
onBeforeMount(() => {
  q.queue = [...getTrackIdList(1)]
  likedTracks.value = JSON.parse(localStorage.getItem('likedTracks')) ?? []
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
  <!-- <HomePage
    @progressBarMouseMove="(e) => onProgressBarMouseMove(e)"
    @progressBarMouseUp="(e) => onProgressBarMouseUp(e)"
    @autoPlayPause="autoPlayPause(audioElement)"
    @togglePlay="(ms) => togglePlay(ms)"
    @togglePlayPause="togglePlayPause"
    :isProgressBarClicked="progressBar.isClicked"
  /> -->
   <SearchPage />
</template>
