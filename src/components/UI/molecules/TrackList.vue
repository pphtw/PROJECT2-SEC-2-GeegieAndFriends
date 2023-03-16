<script setup>
import SingleTrack from '../organisms/SingleTrack.vue'
import { useControllerStore, playlistStore } from '@/stores/controllerStore.js'
</script>

<template>
  <div class="rounded-2xl no-scrollbar h-full scroll-smooth overflow-y-scroll">
    <!-- #TrendingList -->
    <div
      class="flex items-center mb-1 h-20 bg-[#E5E5E5] hover:bg-[#D4D4D4] transition ease-in-out rounded-2xl overflow-clip cursor-pointer"
      v-for="(track, index) in playlistStore.selectedPlaylist"
      :key="track.trackId"
      :id="track.trackId"
      :class="{
        'is-playing': useControllerStore.currentTrack.trackId === track.trackId,
      }"
      @mousedown="$event.preventDefault()"
      @click="$emit('onChooseTrackClick', $event)"
    >
      <!-- #Ranking -->
      <div class="w-fit">
        <h1 class="text-center font-bold w-12">{{ index + 1 }}</h1>
      </div>
      <SingleTrack :playlist="playlistStore" :track="track" />
    </div>
  </div>
</template>

<style scoped></style>
