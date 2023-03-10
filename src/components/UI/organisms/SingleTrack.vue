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
import TitleAndArtist from '../atoms/TitleAndArtist.vue'

const musicQueue = inject('musicQueue')
const emit = defineEmits(['toggle-play', 'onChoosePlaylist'])
const props = defineProps({
  playlist: {
    type: Object,
    required: true,
  },
})
const { playlist } = props

// DOM Element
const tracksElement = ref(null)

// Handlers
const onChooseTrackClick = (e) => {
  const chooseTrackId = Number(e.currentTarget.id)
  if (musicQueue.currentPlaylistId !== playlist.selectedPlaylistId) {
    musicQueue.currentPlaylistId = playlist.selectedPlaylistId
    musicQueue.queue = [...getTrackIdList(musicQueue.currentPlaylistId)]
    musicQueue.defaultQueue = musicQueue.queue
    if (musicQueue.isShuffled) {
      musicQueue.toggleShuffle(true)
    }
  }
  musicQueue.skipToTrack(chooseTrackId)
  emit('toggle-play', 300)
  musicQueue.isPlaying = true
}
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
  <div class="rounded-2xl no-scrollbar h-full scroll-smooth overflow-y-scroll">
    <!-- #TrendingList -->
    <!-- for-loop here -->

    <div class="h-10">
      <div
        class="flex items-center mb-1 h-12 bg-[#E5E5E5] hover:bg-[#D4D4D4] transition ease-in-out rounded-2xl overflow-clip cursor-pointer"
        v-for="(track, index) in playlist.selectedPlaylist"
        :key="track.trackId"
        :id="track.trackId"
        :class="{
          'is-playing': musicQueue.currentTrack.trackId === track.trackId,
        }"
        @mousedown="$event.preventDefault()"
        @click="onChooseTrackClick"
        ref="tracksElement"
      >
        <!-- #Ranking -->
        <div class="w-fit">
          <h1 class="text-center font-bold w-12">{{ index + 1 }}</h1>
        </div>
        <!-- #MusicCover -->
        <MusicCover :track="track" />
        <!-- #Title&Artist -->
        <TitleAndArtist :track="track" :index="index" />
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
      </div>
    </div>
  </div>
</template>

<style scoped></style>
