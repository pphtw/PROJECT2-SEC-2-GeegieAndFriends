<script setup>
import { ref, reactive, inject } from 'vue'

import IsShuffled from '../atoms/IsShuffled.vue'
import NoShuffled from '../atoms/NoShuffled.vue'
import PreviousButton from '../atoms/PreviousButton.vue'
import IsPlaying from '../atoms/IsPlaying.vue'
import NoPlaying from '../atoms/NoPlaying.vue'
import SkipButton from '../atoms/SkipButton.vue'
import IsLooping from '../atoms/NoLooping.vue'
import NoLooping from '../atoms/IsLooping.vue'
import Timer from "@/components/UI/atoms/Timer.vue";

const audioElement = inject('audioElement')
const musicQueue = inject('musicQueue')
const progressBar = inject('progressBar')

// Definitions
const props = defineProps({
  'is-overflow': {
    type: Boolean,
  },
})
const emit = defineEmits(['auto-play-pause'])

//DOM Element
const progressBarElement = ref(null)

//Event Handler
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
  emit('auto-play-pause')
}

const onProgressBarMouseDown = (e) => {
  e.preventDefault()
  progressBar.isClicked = true
  progressBar.boundingRect = progressBarElement.value.getBoundingClientRect()
  progressBar.updateTime(e)
}
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
        <Timer :time="progressBar.currentTime"/>
        <Timer :time="progressBar.duration"/>
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
        <div :class="isOverflow ? 'animate-marquee whitespace-nowrap' : ''">
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
