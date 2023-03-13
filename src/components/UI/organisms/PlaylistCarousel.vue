<script setup>
import { ref } from 'vue'
import metadata from '@/assets/metadata.json'

const playlistData = metadata.playlists
const playlistElement = ref(null)
const props = defineProps({
  playlist: {
    type: Object,
    required: true,
  },
  pinnedPlaylist: {
    type: Object,
    required:true
  }
})
const {playlist,pinnedPlaylist} = props

const onChoosePlaylist = (e) => {
  playlist.selectedPlaylistId = Number(e.currentTarget.id)
}
const mappedPlaylists = playlistData.filter(playlist => {
  return pinnedPlaylist.some(pinnedPlaylist => pinnedPlaylist === playlist.playlistId);
});
</script>
<template>
  <div class="grid grid-cols-3 grid-rows-3 gap-8">
    <div
        v-for="playlist in mappedPlaylists"
        :style="{ backgroundImage: 'url(' + encodeURI(playlist.background) + ')' }"
        :key="playlist['playlistId']"
        :id="playlist['playlistId']"
        @click="onChoosePlaylist"
        class="flex justify-center cursor-pointer hover:opacity-80 bg-cover"
        tabindex="-1"
    >
      <p class="text-white truncate text-lg font-semibold self-center text-center">
        {{ playlist.name }}
      </p>
    </div>
  </div>
</template>
