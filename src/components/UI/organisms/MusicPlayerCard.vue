<script setup>
import { ref, inject, onUpdated } from 'vue'

import ShuffleButton from '../atoms/ShuffleButton.vue'
import PreviousButton from '../atoms/PreviousButton.vue'
import PlayPauseButton from '../atoms/PlayPauseButton.vue'
import SkipButton from '../atoms/SkipButton.vue'
import RepeatButton from '../atoms/RepeatButton.vue'
import Timer from '@/components/UI/atoms/Timer.vue'
import { queueStore } from '@/lib/store'

const audioElement = inject('audioElement')
const progressBar = inject('progressBar')

const emit = defineEmits(['autoPlayPause'])

//DOM Element
const progressBarElement = ref(null)
const titleElement = ref(null)

// States
const isOverflow = ref(false)

//Event Handler

const checkOverflow = () => {
  const element = titleElement.value
  isOverflow.value = false
  setTimeout(() => {
    isOverflow.value =
      element.scrollHeight > element.offsetHeight ||
      element.scrollWidth > element.offsetWidth
  }, 0)
}
const trackSkipHandler = (toNext = true) => {
  queueStore.skipTrack(toNext)
  emit('autoPlayPause')
}

const onProgressBarMouseDown = (e) => {
  e.preventDefault()
  progressBar.isClicked = true
  progressBar.boundingRect = progressBarElement.value.getBoundingClientRect()
  progressBar.updateTime(e)
}
const onShuffleHandler = (e) => {
  if (e.code === 'KeyS' || e.button === 0) {
    if (queueStore.tempQueue.length === 0) {
      queueStore.tempQueue = queueStore.queue
    }
    if (!queueStore.isShuffled) {
      queueStore.toggleShuffle(true)
      queueStore.isShuffled = true
    } else {
      queueStore.toggleShuffle(false)
      queueStore.isShuffled = false
    }
  }
}
const onLoopHandler = (e) => {
  console.log('Create Loop Handler Here')
  console.log(e)
}
const config = { attributes: true, childList: true, subtree: true }

const callback = (mutationList) => {
  mutationList.forEach((mutation) => {
    if (mutation.type === 'childList') {
      checkOverflow()
    }
  })
}
const observer = new MutationObserver(callback)
onUpdated(() => {
  observer.observe(titleElement.value, config)
})
</script>

<template>
  <div class="flex flex-col rounded-2xl bg-white h-full">
    <!-- #MusicCover -->
    <div
      class="h-full bg-cover bg-center rounded-t-2xl aspect-auto"
      :style="{
        backgroundImage:
          'url(' + encodeURI(queueStore.currentTrack.cover) + ')',
      }"
      @click="checkOverflow"
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
        <Timer :time="progressBar.currentTime" />
        <Timer :time="progressBar.duration" />
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
            {{ queueStore.currentTrack.name }}
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
            {{ queueStore.currentTrack.name }}
          </h1>
        </div>
      </div>
      <div class="text-center h-fit w-[70%]">
        <h3 class="font-semibold w-full">
          {{ queueStore.currentTrack.artist }}
        </h3>
      </div>

      <!-- #Controller -->
      <div
        class="flex justify-center basis-16 items-center gap-5 h-fit w-full sm:overflow-hidden max-sm:gap-4 2xl:gap-6"
      >
        <!-- #ShuffleButton -->
        <div class="random-track">
          <button @click="onShuffleHandler">
            <ShuffleButton :isActive="queueStore.isShuffled" />
          </button>
        </div>
        <!-- #SkipBackButton -->
        <div class="prev-track" @click="trackSkipHandler(false)">
          <button>
            <PreviousButton />
          </button>
        </div>
        <!-- #PlayPauseButton -->
        <div>
          <button
            class="[clip-path:circle()]"
            @click="queueStore.togglePlayPause(audioElement)"
          >
            <PlayPauseButton :isActive="queueStore.isPlaying" />
          </button>
        </div>
        <!-- #SkipButton -->
        <div class="next-track" @click="trackSkipHandler">
          <button>
            <SkipButton />
          </button>
        </div>
        <!-- #RepeatButton -->
        <div class="repeat-track">
          <button @click="queueStore.toggleRepeat()">
            <RepeatButton :isActive="queueStore.isRepeating" />
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
