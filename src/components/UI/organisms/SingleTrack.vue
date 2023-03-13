<script setup>
import LikeButton from '../atoms/LikeButton.vue'
import MenuButton from '../atoms/MenuButton.vue'
import Timer from '@/components/UI/atoms/Timer.vue'
import MusicCover from '../atoms/MusicCover.vue'
import TitleAndArtist from '../molecules/TitleAndArtist.vue'
import { playlistStore } from '@/lib/store'

const emit = defineEmits(['toggle-play'])
const props = defineProps({
  playlist: {
    type: Object,
    required: true,
  },
  track: {
    type: [Number, Object],
    required: true,
  },
  trackIndex: {
    type: Number,
    required: true,
  },
})

const { track, trackIndex } = props

//Favorite
const onLikeHandler = (e, trackId) => {
  e.stopPropagation()
  playlistStore.addToFavorites(trackId)
}
</script>

<template>
  <!-- #Ranking -->
  <div class="w-fit">
    <h1 class="text-center font-bold w-12">{{ trackIndex + 1 }}</h1>
  </div>
  <!-- #MusicCover -->
  <MusicCover :track="track" />
  <!-- #Title&Artist -->
  <TitleAndArtist :track="track" />
  <Timer :time="track.duration" :size="5" :weight="2" />
  <!-- #LikeButton -->
  <div class="px-3 hidden sm:block">
    <button @click="onLikeHandler($event, track['trackId'])">
      <LikeButton
        fill="#c493e1"
        stroke="#c493e1"
        v-if="playlistStore.checkFavorites(track.trackId)"
      />
      <LikeButton fill="none" stroke="black" v-else />
    </button>
  </div>
  <!-- #MenuButton -->
  <div class="px-3">
    <MenuButton />
  </div>
</template>

<style scoped></style>
