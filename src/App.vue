<script setup>
import { computed, onBeforeMount, reactive, ref, provide } from 'vue'

// Components
import HomePage from '@/components/pages/HomePage.vue'
import SearchPage from '@/components/pages/SearchPage.vue'
import { getPlaylist, getTrack, getTrackIdList } from '@/lib/getTracksData'
import { secToMin } from '@/lib/utils'
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
provide('musicQueue', musicQueue)
provide('progressBar', progressBar)

//event handler
const onLoadMetadataHandler = () => {
  progressBar.duration = secToMin(audioElement.value.duration)
  progressBar.currentTime = secToMin(audioElement.value.currentTime)
  progressBar.updateProgressBar()
  // isOverflowed()
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
const autoPlayPause = () => {
  if (musicQueue.isPlaying) {
    audioElement.value.play()
  } else {
    audioElement.value.pause()
  }
}
const togglePlay = (ms = 0) => {
  setTimeout(() => {
    audioElement.value.play()
  }, ms)
}

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
  <!-- <HomePage
    @progress-bar-mouse-move="(e) => onProgressBarMouseMove(e)"
    @progress-bar-mouse-up="(e) => onProgressBarMouseUp(e)"
    @auto-play-pause="autoPlayPause"
    @toggle-play="(ms) => togglePlay(ms)"
    :is-progress-bar-clicked="progressBar.isClicked"
    @click-playlist="on"
  /> -->
   <SearchPage />
</template>
