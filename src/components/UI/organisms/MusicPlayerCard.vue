<script setup>
import { ref, inject, onUpdated, onMounted } from 'vue'
import { useControllerStore } from '@/stores/controllerStore'
import { storeToRefs } from 'pinia'

import ShuffleButton from '../atoms/ShuffleButton.vue'
import PreviousButton from '../atoms/PreviousButton.vue'
import PlayPauseButton from '../atoms/PlayPauseButton.vue'
import SkipButton from '../atoms/SkipButton.vue'
import RepeatButton from '../atoms/RepeatButton.vue'
import ProgressBarWithTimer from '@/components/UI/molecules/ProgressBarWithTimer.vue'
import { useOverlayStore } from '@/stores/overlayStore'

// Use Store
const controllerStore = useControllerStore()
const overlayStore = useOverlayStore()

const { currentTrack, isShuffled, isRepeating, isPlaying } =
  storeToRefs(controllerStore)
const { toggleShuffle, toggleRepeat, skipTrack, togglePlayPause } =
  controllerStore
const { showContextMenu } = overlayStore

const audioElement = inject('audioElement')
const emit = defineEmits(['autoPlayPause'])
//DOM Elements
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

const onLoopHandler = () => {
  if (!isRepeating.value) {
    isRepeating.value = true
  } else {
    isRepeating.value = false
  }
  toggleRepeat()
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
onMounted(() => {
  observer.observe(titleElement.value, config)
})
</script>

<template>
  <div
    class="flex flex-col rounded-2xl bg-white h-full"
    @contextmenu.prevent="showContextMenu"
  >
    <!-- #MusicCover -->
    <div
      class="h-full bg-cover bg-center rounded-t-2xl aspect-auto"
      :style="{
        backgroundImage: 'url(' + encodeURI(currentTrack?.cover) + ')',
      }"
      @click="checkOverflow"
    ></div>
    <!-- #ProgressBar -->
    <ProgressBarWithTimer />
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
            {{ currentTrack.name }}
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
            {{ currentTrack.name }}
          </h1>
        </div>
      </div>
      <div class="text-center h-fit w-[70%]">
        <h3 class="font-semibold w-full">
          {{ currentTrack.artist }}
        </h3>
      </div>

      <!-- #Controller -->
      <div
        class="flex justify-center basis-16 items-center gap-5 h-fit w-full sm:overflow-hidden max-sm:gap-4 2xl:gap-6"
      >
        <!-- #ShuffleButton -->
        <button @click="toggleShuffle">
          <ShuffleButton :isActive="isShuffled" />
        </button>
        <!-- #SkipBackButton -->
        <button @click="skipTrack(false)">
          <PreviousButton />
        </button>
        <!-- #PlayPauseButton -->
        <button
          class="[clip-path:circle()]"
          @click="togglePlayPause(audioElement)"
        >
          <PlayPauseButton :isActive="isPlaying" />
        </button>
        <!-- #SkipButton -->
        <button>
          <SkipButton @click="skipTrack(true)" />
        </button>
        <!-- #RepeatButton -->
        <div class="repeat-track">
          <button @click="onLoopHandler">
            <RepeatButton :isActive="isRepeating" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
