<script setup>
import { ref, reactive, computed, inject } from 'vue'
import {
  getPlaylist,
  getTrack,
  getTrackIdList,
  getTrackList,
} from '@/utils/getTracksData'
import LikeButton from '../atoms/LikeButton.vue'
import MenuButton from '../atoms/MenuButton.vue'
import Timer from '@/components/UI/atoms/Timer.vue'
import MusicCover from '../atoms/MusicCover.vue'
import TitleAndArtist from '../molecules/TitleAndArtist.vue'

const musicQueue = inject('musicQueue')
const emit = defineEmits(['toggle-play', 'onChoosePlaylist'])
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
    required: false,
  },
})

const { playlist, track, trackIndex } = props
console.log(track)

// Utils
const checkFavourite = (trackId) => {
  const arr = [...playlist.favourites]
  return arr.includes(trackId)
}
const onChoosePlaylist = (e) => {
  playlist.selectedPlaylistId = Number(e.currentTarget.id)
  emit('onChoosePlaylist')
}
//Favorite
const onLikeHandler = (e, trackId) => {
  e.stopPropagation()
  if (checkFavourite(trackId)) {
    playlist.favourites.splice(playlist.favourites.indexOf(trackId), 1)
  } else {
    playlist.favourites.push(trackId)
  }
  localStorage.setItem('favourites', JSON.stringify(playlist.favourites))
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
        v-if="checkFavourite(track['trackId'])"
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
