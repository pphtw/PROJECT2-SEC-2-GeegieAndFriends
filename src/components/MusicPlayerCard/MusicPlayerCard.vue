<script setup>
import IsShuffled from '../MusicPlayerCard/Icons/IsShuffled.vue'
import NoShuffled from './Icons/NoShuffled.vue'
import PreviousButton from './Icons/PreviousButton.vue'
import IsPlaying from './Icons/IsPlaying.vue'
import NoPlaying from './Icons/NoPlaying.vue'
import SkipButton from './Icons/SkipButton.vue'
import IsLooping from './Icons/NoLooping.vue'
import NoLooping from './Icons/IsLooping.vue'

import { reactive } from 'vue';
const props = defineProps({
  musicQueue: {
    type: Object
  },
  audioElement: {
    type: Object
  }
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

//event Handler
const playerHandler = () => {
  if (audioElement.value.paused) {
    audioElement.value.play()
    musicQueue.isPlaying = true
  } else {
    audioElement.value.pause()
    musicQueue.isPlaying = false
  }
}
const trackSkipHandler = (toNext = true) => {
  musicQueue.skipTrack(toNext)
  toggleDelayedPlayPause()
}
const onLoadMetadataHandler = () => {
  progressBar.duration = secToMin(audioElement.value.duration)
  progressBar.currentTime = secToMin(audioElement.value.currentTime)
  progressBar.updateProgressBar()
  isOverflowed()
}
const onTimeUpdateHandler = () => {
  progressBar.currentTime = secToMin(audioElement.value.currentTime)
  if (!progressBar.isClicked) {
    progressBar.updateProgressBar()
  }
}
const onProgressBarMouseDown = (e) => {
  e.preventDefault()
  progressBar.isClicked = true
  progressBar.boundingRect = progressBarElement.value.getBoundingClientRect()
  progressBar.updateTime(e)
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

//shuffle
const onShuffleHandler = (e) => {
  if (e.code === 'KeyS' || e.button === 0) {
    if (musicQueue.defaultQueue.length === 0) {
      musicQueue.defaultQueue = musicQueue.queue
    }
    if (!musicQueue.isShuffled) {
      musicQueue.toggleShuffle(true)
      musicQueue.isShuffled = true
    } else {
      musicQueue.toggleShuffle(false)
      musicQueue.isShuffled = false
    }
  }
}

//loop
const onLoopHandler = (e) => {
  console.log('Create Loop Handler Here')
  console.log(e)
}

</script>
 
<template>
<div class="flex flex-col rounded-2xl bg-white h-fit sm:h-full">
          <!-- #MusicCover -->
          <div
            class="h-fit sm:h-full bg-cover bg-center rounded-t-2xl aspect-square sm:aspect-auto"
            :style="{
              backgroundImage:
                'url(' + encodeURI(musicQueue.currentTrack.cover) + ')',
            }"
          ></div>
          <!-- #ProgressBar -->
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
          <!-- #CurrentTime&Duration -->
          <div>
            <div class="flex justify-between w-full items-center">
              <p class="px-2 text-sm">{{ progressBar.currentTime }}</p>
              <p class="px-2 text-sm">{{ progressBar.duration }}</p>
            </div>
          </div>
          <!-- #MusicTitle&Controller -->
          <div
            class="flex flex-col gap-1 justify-around items-center h-fit bg-white rounded-b-2xl"
          >
            <!-- #MusicTitle&Artist -->
            <div
              class="relative text-center h-8 w-[80%] overflow-x-hidden"
              ref="titleElement"
            >
              <div
                :class="isOverflow ? 'animate-marquee whitespace-nowrap' : ''"
              >
                <h1 class="text-2xl font-bold">
                  {{ musicQueue.currentTrack.name }}
                </h1>
              </div>
              <div
                :class="
                  isOverflow
                    ? 'absolute top-0 animate-marquee2 whitespace-nowrap visible'
                    : 'hidden'
                "
              >
                <h1 class="text-2xl font-bold">
                  {{ musicQueue.currentTrack.name }}
                </h1>
              </div>
            </div>
            <div class="text-center h-fit w-[70%]">
              <h3 class="font-semibold w-full">
                {{ musicQueue.currentTrack.artist }}
              </h3>
            </div>

            <!-- #Controller -->
            <div
              class="flex justify-center basis-16 items-center gap-5 h-fit w-full sm:overflow-hidden max-sm:gap-4 2xl:gap-6"
            >
              <!-- #ShuffleButton -->
              <div class="random-track">
                <button @click="onShuffleHandler">
                  <IsShuffled v-if="musicQueue.isShuffled" />
                  <NoShuffled v-else />
                </button>
              </div>
              <!-- #PreviousButton -->
              <div class="prev-track" @click="trackSkipHandler(false)">
                <button>
                  <PreviousButton />
                </button>
              </div>
              <!-- #PlayButton/PauseButton -->
              <div>
                <button class="[clip-path:circle()]" @click="playerHandler">
                  <IsPlaying v-if="musicQueue.isPlaying" />
                  <NoPlaying v-else />
                </button>
              </div>
              <!-- #SkipButton -->
              <div class="next-track" @click="trackSkipHandler">
                <button>
                  <SkipButton />
                </button>
              </div>
              <!-- #LoopButton -->
              <div class="repeat-track">
                <button @click="onLoopHandler">
                  <NoLooping v-if="musicQueue.isLooping" />
                  <IsLooping v-else />
                </button>
              </div>
            </div>
          </div>
        </div>
</template>
 
<style scoped>

</style>