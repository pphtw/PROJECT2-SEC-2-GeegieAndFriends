<script setup>
import LikeButton from '../atoms/LikeButton.vue'
import MenuButton from '../atoms/MenuButton.vue'
import Timer from '@/components/UI/atoms/Timer.vue'
import MusicCover from '../atoms/MusicCover.vue'
import TitleAndArtist from '../molecules/TitleAndArtist.vue'
import { useControllerStore } from '@/stores/controllerStore'
import { usePlaylistStore } from '@/stores/usePlaylistStore'

const playlistStore = usePlaylistStore()
const controllerStore = useControllerStore()

const { addToFavorites, checkFavorites } = playlistStore

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
    <button @click="onLikeHandler($event, track['trackId'])">
      <LikeButton
        fill="#c493e1"
        stroke="#c493e1"
        v-if="checkFavorites(track.trackId)"
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
