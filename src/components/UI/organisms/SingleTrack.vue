<script setup>
import LikeButton from '../atoms/LikeButton.vue'
import MenuButton from '../atoms/MenuButton.vue'
import Timer from '@/components/UI/atoms/Timer.vue'
import MusicCover from '../atoms/MusicCover.vue'
import TitleAndArtist from '../molecules/TitleAndArtist.vue'
import { usePlaylistStore } from '@/stores/playlistStore'

const playlistStore = usePlaylistStore()

const { addToFavorites, checkFavorites } = playlistStore

const emit = defineEmits(['toggle-play'])
const props = defineProps({
  track: {
    type: [Number, Object],
    required: true,
  },
})

const { track } = props

//Favorite
const onLikeHandler = (e, trackId) => {
  e.stopPropagation()
  addToFavorites(trackId)
}
</script>

<template>
  <!-- #MusicCover -->
  <MusicCover :track="track" />
  <!-- #Title&Artist -->
  <TitleAndArtist :track="track" />
  <Timer :time="track.duration" :size="5" :weight="2" />
  <!-- #LikeButton -->
  <div class="px-3 hidden sm:block">
    <button @click="onLikeHandler($event, track.id)">
      <LikeButton
        fill="#c493e1"
        stroke="#c493e1"
        v-if="checkFavorites(track.id)"
      />
      <LikeButton fill="none" stroke="black" v-else />
    </button>
  </div>
  <!-- #MenuButton -->
  <div class="px-3">
    <MenuButton fill="#231F20" />
  </div>
</template>

<style scoped></style>
