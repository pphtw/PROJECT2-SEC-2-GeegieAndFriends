<script setup>
import { computed, onBeforeMount, reactive, ref , provide} from 'vue'
// Conponents
import HomeContainer from './components/HomeContainer/HomeContainer.vue'
import NavigationBar from './components/NavigationBar/NavigationBar.vue'
import { getPlaylist, getTrack, getTrackIdList } from '@/utils/getTracksData'
import { secToMin } from '@/utils/utils'

const musicQueue = reactive({
  currentPlaylistId: 1,
  currentTrack: computed(() => getTrack(musicQueue?.queue[0])),
  defaultQueue: [],
  queue: [],
  isShuffled: false,
  isLooping: false,
  isPlaying: false,
  toggleShuffle: (shuffle) => {
    const currentTrackId = musicQueue.queue[0]
    if (shuffle) {
      const restOfQueue = musicQueue.queue.filter((e, i) => i !== 0)
      for (let i = restOfQueue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = restOfQueue[i]
        restOfQueue[i] = restOfQueue[j]
        restOfQueue[j] = temp
      }
      musicQueue.queue = [currentTrackId, ...restOfQueue]
    } else {
      musicQueue.skipToTrack(currentTrackId, musicQueue.defaultQueue)
      musicQueue.queue = musicQueue.defaultQueue
    }
  },
  skipTrack: (toNext = true, queue = musicQueue.queue) => {
    if (toNext) {
      queue.push(queue.shift())
    } else {
      queue.unshift(queue.pop())
    }
  },
  skipToTrack: (id, queue = musicQueue.queue) => {
    const indexToSkip = queue.findIndex((trackId) => trackId === Number(id))
    if (Boolean(indexToSkip)) {
      if (indexToSkip < queue.length / 2) {
        while (queue[0] !== id) {
          musicQueue.skipTrack(true, queue)
        }
      } else {
        while (queue[0] !== id) {
          musicQueue.skipTrack(false, queue)
        }
      }
    }
  },
})
// //DOM Elements
const audioElement = ref(null)
provide('audioElement', audioElement)
provide('musicQueue', musicQueue)

// //event handler
// const playerHandler = () => {
//   if (audioElement.value.paused) {
//     audioElement.value.play()
//     musicQueue.isPlaying = true
//   } else {
//     audioElement.value.pause()
//     musicQueue.isPlaying = false
//   }
// }
// const trackSkipHandler = (toNext = true) => {
//   musicQueue.skipTrack(toNext)
//   toggleDelayedPlayPause()
// }
// const onLoadMetadataHandler = () => {
//   progressBar.duration = secToMin(audioElement.value.duration)
//   progressBar.currentTime = secToMin(audioElement.value.currentTime)
//   progressBar.updateProgressBar()
//   isOverflowed()
// }
// const onTimeUpdateHandler = () => {
//   progressBar.currentTime = secToMin(audioElement.value.currentTime)
//   if (!progressBar.isClicked) {
//     progressBar.updateProgressBar()
//   }
// }
// const toggleDelayedPlayPause = (delay = 0) => {
//   setTimeout(() => {
//     if (musicQueue.isPlaying) {
//       audioElement.value.play()
//     } else {
//       audioElement.value.pause()
//     }
//   }, delay)
// }

// Hooks
onBeforeMount(() => {
  musicQueue.queue = [...getTrackIdList(1)]
})
</script>
<template>
  <audio
    ref="audioElement"
    :src="musicQueue.currentTrack.source"
    @timeupdate="onTimeUpdateHandler"
    @loadedmetadata="onLoadMetadataHandler"
    @ended="trackSkipHandler"
  ></audio>
  <div
    class="flex flex-col justify-end sm:flex-row w-screen h-screen sm:h-screen sm:px-0 bg-[#162750]"
  >
    <!-- #NavigationBar -->
    <NavigationBar />
    <!-- #HomeContainer -->
    <!-- <HomeContainer 
    :music-queue="musicQueue"
    @player-handler="playerHandler" 
    @track-skip-prev="trackSkipHandler(false)"
    @track-skip-next="trackSkipHandler"
    /> -->
    <HomeContainer 
    
    />
  </div>
</template>
<style scoped></style>
