<script setup>
import { useOverlayStore } from '@/stores/overlayStore'
import { storeToRefs } from 'pinia'
import PlaylistOverlay from '@/components/UI/organisms/PlaylistOverlay.vue'
import CreateOverlay from './CreateOverlay.vue'

const overlayStore = useOverlayStore()

const { showPlaylistOverlay, showCreateOverlay } = overlayStore

const props = defineProps({
  cols: {
    type: Number,
    required: false,
    default: 1,
  },
  playlists: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="min-h-0 overflow-y-scroll">
    <div class="h-fit gap-x-6 gap-y-3 grid grid-cols-6">
      <div
        class="flex justify-center cursor-pointer h-full aspect-square hover:opacity-80 bg-cover rounded-xl my-auto truncate bg-green-50"
        :style="{
          backgroundImage:
            'url(' +
            encodeURI('https://wallpaper.dog/large/20408036.jpg') +
            ')',
        }"
        @click="showCreateOverlay"
      >
        <p
          class="text-white truncate text-lg font-semibold self-center text-center"
        >
          Create Playlist
        </p>
      </div>
      <div
        class="flex justify-center cursor-pointer h-full aspect-square hover:opacity-80 bg-cover rounded-xl my-auto"
        v-for="playlist in playlists"
        :key="playlist.id"
        :id="playlist.id"
        :style="{
          backgroundImage: 'url(' + encodeURI(playlist.background) + ')',
        }"
        tabindex="-1"
        @click="showPlaylistOverlay"
      >
        <p
          class="text-white truncate text-lg font-semibold self-center text-center"
        >
          {{ playlist.name }}
        </p>
      </div>
    </div>
  </div>
  <PlaylistOverlay />
  <CreateOverlay />
</template>

<style scoped></style>
