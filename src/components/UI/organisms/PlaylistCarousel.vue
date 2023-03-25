<script setup>
import { ref } from 'vue'
import { getPlaylist } from '@/lib/getData'
import { useControllerStore } from '@/stores/controllerStore.js'
import { usePlaylistStore } from '@/stores/playlistStore'
import { storeToRefs } from 'pinia'

// Use Store
const playlistStore = usePlaylistStore()
const controllerStore = useControllerStore()

const { selectedPlaylist } = storeToRefs(playlistStore)

const emit = defineEmits(['nextPageHandler', 'previousPageHandler'])

const props = defineProps({
  shownPlaylist: {
    type: Object,
    required: true,
  },
})

const onChoosePlaylist = (e) => {
  selectedPlaylist.value = Number(e.currentTarget.id)
}
</script>
<template>
  <div class="h-full grid grid-cols-3 gap-x-6 gap-y-3">
    <div
      v-for="playlist in shownPlaylist"
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
