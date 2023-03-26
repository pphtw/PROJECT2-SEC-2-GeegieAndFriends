<script setup>
import { onBeforeMount, reactive, ref, provide } from 'vue'

// Components
import { secToMin } from '@/lib/util'
import { useControllerStore } from '@/stores/controllerStore.js'
import { usePlaylistStore } from '@/stores/playlistStore'
import { storeToRefs } from 'pinia'
import { RouterView } from 'vue-router'
import { updatePlaylist } from './lib/getData'

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
  initController,
} = controllerStore

//progress bar

//DOM Elements
const audioElement = ref(null)
const time = reactive({
  currentTime: secToMin(),
  duration: secToMin(),
})

provide('time', time)
// pass object
provide('audioElement', audioElement)
// provide('progressBar', progressBar)

//event handler
const timeUpdateHandler = () => {
  time.currentTime = secToMin(audioElement.value.currentTime)
  time.duration = secToMin(audioElement.value.duration)
}

// Hooks
onBeforeMount(async () => {
  await initController()
})
</script>
<template>
  <audio
    ref="audioElement"
    id="audio"
    :src="currentTrack.source"
    @ended="skipTrack()"
    @canplay="autoPlayPause(audioElement)"
    @timeupdate="timeUpdateHandler"
  ></audio>
  <RouterView
    @autoPlayPause="autoPlayPause(audioElement)"
    @chooseTrack="(ms) => togglePlay(audioElement, ms)"
    @togglePlayPause="togglePlayPause"
  />
</template>
