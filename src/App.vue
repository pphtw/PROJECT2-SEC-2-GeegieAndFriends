<script setup>
import { reactive, ref, provide, Transition, onMounted } from 'vue'

// Components
import { secToMin } from '@/lib/util'
import { useControllerStore } from '@/stores/controllerStore.js'
import { usePlaylistStore } from '@/stores/playlistStore'
import { storeToRefs } from 'pinia'
import { RouterView } from 'vue-router'
import NavigationBar from './components/UI/organisms/NavigationBar.vue'

// Use Store
const playlistStore = usePlaylistStore()
const controllerStore = useControllerStore()

const { likedTracks } = storeToRefs(playlistStore)
const { currentTrack, q, progressBar } = storeToRefs(controllerStore)

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

provide('audioElement', audioElement)

//event handler
const timeUpdateHandler = () => {
  updateTime(audioElement.value.currentTime, audioElement.value.duration)
}

const onLoadMetadataHandler = () => {
  audioElement.volume = 0.1
  updateTime(audioElement.value.currentTime, audioElement.value.duration)
}

const onProgressBarMouseMove = (e) => {
  if (progressBar.isClicked) {
    updateTime(e)
  }
}
const onProgressBarMouseUp = (e) => {
  if (progressBar.isClicked) {
    updateTime(audioElement.value.currentTime, audioElement.value.duration)
    progressBar.isClicked = false
  }
}

// Hooks
onMounted(async () => {
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
    @loadedmetadata="onLoadMetadataHandler"
    @progressBarMouseMove="(e) => onProgressBarMouseMove(e)"
    @progressBarMouseUp="(e) => onProgressBarMouseUp(e)"
  ></audio>
  <div class="flex flex-row w-screen">
    <NavigationBar />
    <RouterView
      @autoPlayPause="autoPlayPause(audioElement)"
      @chooseTrack="(ms) => togglePlay(audioElement, ms)"
      @togglePlayPause="togglePlayPause"
      v-slot="{ Component }"
    >
      <Transition name="slide" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>
<style scoped>
.slide-leave-from {
  opacity: 0;
  transform: translateY(100%);
}
.slide-leave-active {
  transition: 0.8s ease-out;
}
.slide-leave-to {
  transform: translateY(-100%);
}
</style>
