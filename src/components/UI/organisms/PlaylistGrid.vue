<script setup>
import { useOverlayStore } from '@/stores/overlayStore'
import { storeToRefs } from 'pinia'
import PlaylistOverlay from '@/components/UI/organisms/PlaylistOverlay.vue'
import CreateOverlay from './CreateOverlay.vue'

const overlayStore = useOverlayStore()
const { showPlaylistOverlay, showCreateOverlay } = overlayStore

defineEmits(['createPlaylist', 'deletePlaylist'])

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
        class="flex justify-center cursor-pointer h-full aspect-square hover:opacity-80 bg-cover rounded-xl my-auto truncate bg-transparent/30"
        @click="showCreateOverlay"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon scale-75"
          viewBox="0 0 512 512"
        >
          <path
            fill="#FFFFFF"
            stroke="#FFFFFF"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M256 112v288M400 256H112"
          />
        </svg>
      </div>
      <div
        class="flex justify-center cursor-pointer h-full aspect-square hover:opacity-80 bg-transparent/80 bg-cover rounded-xl my-auto"
        v-for="playlist in playlists"
        :key="playlist.id"
        :id="playlist.id"
        :style="{
          backgroundImage: 'url(' + encodeURI(playlist.background) + ')',
        }"
        tabindex="-1"
        @click="showPlaylistOverlay"
      >
        <p class="text-white text-lg font-semibold self-center text-center">
          {{ playlist.name }}
        </p>
      </div>
    </div>
  </div>
  <PlaylistOverlay @deletePlaylist="$emit('deletePlaylist')" />
  <CreateOverlay @createPlaylist="$emit('createPlaylist')" />
</template>

<style scoped></style>
