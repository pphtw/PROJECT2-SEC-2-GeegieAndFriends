<script setup>
import SingleTrack from './SingleTrack.vue'
import { useControllerStore } from '@/stores/controllerStore'
import { usePlaylistStore } from '@/stores/playlistStore'
import { storeToRefs } from 'pinia'
import { useSearchStore } from '@/stores/searchStore'

// Use Store
const controllerStore = useControllerStore()

const { currentTrack } = storeToRefs(controllerStore)

const props = defineProps({
  tracklist: {
    type: Object,
    require: true,
  },
})
</script>

<template>
  <div class="rounded-2xl no-scrollbar h-full scroll-smooth overflow-y-scroll">
    <!-- #TrackList -->
    <div
      class="flex items-center mb-1 h-20 bg-[#E5E5E5] hover:bg-[#D4D4D4] transition ease-in-out rounded-2xl overflow-clip cursor-pointer"
      v-for="(track, index) in tracklist"
      :key="track.trackId"
      :id="track.trackId"
      :class="{
        'is-playing': currentTrack.trackId === track.trackId,
      }"
      @mousedown="$event.preventDefault()"
      @click="$emit('onChooseTrackClick', $event)"
    >
      <!-- #Ranking -->
      <div class="w-fit">
        <h1 class="text-center font-bold w-12">
          {{ index + 1 }}
        </h1>
      </div>
      <SingleTrack :track="track" />
    </div>
  </div>
</template>

<style scoped>
.is-playing,
.is-playing:hover {
  background-color: #eedff6;
}
</style>
