<script setup>
import { ref, provide, Transition, onMounted } from 'vue'

// Components
import { useControllerStore } from '@/stores/controllerStore.js'
import { usePlaylistStore } from '@/stores/playlistStore'
import { storeToRefs } from 'pinia'
import { RouterView } from 'vue-router'
import NavigationBar from './components/UI/organisms/NavigationBar.vue'
import ContextMenu from '@/components/UI/organisms/ContextMenu.vue'
import { useOverlayStore } from '@/stores/overlayStore'

// Use Store
const playlistStore = usePlaylistStore()
const controllerStore = useControllerStore()
const overlayStore = useOverlayStore()

const { likedTracks } = storeToRefs(playlistStore)
const { currentTrack, q, progressBar } = storeToRefs(controllerStore)
const {
  skipTrack,
  autoPlayPause,
  togglePlayPause,
  togglePlay,
  initController,
} = controllerStore
const { hideContextMenu } = overlayStore

//progress bar

//DOM Elements
const audioElement = ref(null)

provide('audioElement', audioElement)

//event handler
const timeUpdateHandler = () => {
  if (!progressBar.value.isClicked) {
    progressBar.value.updateTime(audioElement.value.currentTime)
  }
}

const onLoadMetadataHandler = () => {
  progressBar.value.duration = audioElement.value.duration
  progressBar.value.updateTime(audioElement.value.currentTime)
}

const onProgressBarMouseMove = (e) => {
  if (progressBar.value.isClicked) {
    progressBar.value.updateProgress(e)
  }
}

const onProgressBarMouseUp = (e) => {
  if (progressBar.value.isClicked) {
    progressBar.value.updateProgress(e)
    audioElement.value.currentTime = progressBar.value.currentTime
    progressBar.value.isClicked = false
  }
}

// Hooks
onMounted(async () => {
    audioElement.value.volume = 0.3
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
  ></audio>
  <div
    class="flex flex-row w-screen h-screen"
    @mouseup="onProgressBarMouseUp"
    @mousemove="onProgressBarMouseMove"
    @click="hideContextMenu"
  >
    <NavigationBar />
    <div class="h-full w-full flex flex-col">
      <RouterView
        @autoPlayPause="autoPlayPause(audioElement)"
        @chooseTrack="(ms) => togglePlay(audioElement, ms)"
        @togglePlayPause="togglePlayPause"
        v-slot="{ Component, route }"
      >
        <Transition :name="route.meta.transition" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </div>
  <ContextMenu />
</template>
<style scoped>
.slide-down-leave-to,
.slide-up-enter-from {
  opacity: 0.1;
  transform: translateY(100%);
}
.slide-down-enter-active,
.slide-up-enter-active {
  transition: 0.5s ease-in-out;
}
.slide-down-leave-from,
.slide-up-enter-to,
.slide-down-enter-to,
.slide-up-leave-from {
  opacity: 1;
  transform: translateY(0%);
}
.slide-down-leave-active,
.slide-up-leave-active {
  transition: 0.5s ease-in-out;
}
.slide-down-enter-from,
.slide-up-leave-to {
  opacity: 0.1;
  transform: translateY(-100%);
}
</style>
