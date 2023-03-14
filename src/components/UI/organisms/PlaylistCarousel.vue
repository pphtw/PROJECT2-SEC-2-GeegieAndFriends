<script setup>
import { ref } from 'vue'
import { playlistStore } from '@/lib/store'
import { getPlaylist } from '@/lib/getData'

const playlistElement = ref(null)
const emit = defineEmits(['nextPageHandler', 'previousPageHandler'])

const onChoosePlaylist = (e) => {
  playlistStore.selectedPlaylist = Number(e.currentTarget.id)
}
const mappedPlaylists = playlistStore.pinnedPlaylist.map((playlistId) =>
  getPlaylist(playlistId)
)
</script>
<template>
  <div class="h-full grid grid-cols-3 gap-x-6 gap-y-3">
      <div
        v-for="playlist in mappedPlaylists"
        :style="{
          backgroundImage: 'url(' + encodeURI(playlist.background) + ')',
        }"
        :key="playlist['playlistId']"
        :id="playlist['playlistId']"
        @click="onChoosePlaylist"
        class="flex justify-center cursor-pointer h-full hover:opacity-80 bg-cover rounded-xl my-auto"
        tabindex="-1"
      >
        <p
          class="text-white truncate text-lg font-semibold self-center text-center"
        >
          {{ playlist.name }}
        </p>
      </div>
  </div>
</template>
