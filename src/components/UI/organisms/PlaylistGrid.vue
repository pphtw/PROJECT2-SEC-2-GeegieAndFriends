<script setup>
import { useOverlayStore } from '@/stores/overlayStore'
import { storeToRefs } from 'pinia'
import PlaylistOverlay from '@/components/UI/organisms/PlaylistOverlay.vue'

const overlayStore = useOverlayStore()

const { showPlaylistOverlay } = overlayStore

const props = defineProps({
  playlists: {
    type: Object,
    required: true,
  },
  cols: {
    type: Number,
    default: 6,
  },
})
</script>

<template>
  <div class="min-h-0 overflow-y-scroll">
    <div class="h-fit grid gap-x-6 gap-y-3" :class="`grid-cols-${cols}`">
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
</template>

<style scoped></style>
