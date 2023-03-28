<script setup>
import { usePlaylistStore } from '@/stores/playlistStore'
import { storeToRefs } from 'pinia'
import { getFilteredItemList } from '@/lib/getData'
import { onMounted, ref } from 'vue'

// Use Store
const playlistStore = usePlaylistStore()

const { pinnedPlaylistIdList } = storeToRefs(playlistStore)

// Definitions
const emit = defineEmits([
  'nextPageHandler',
  'previousPageHandler',
  'choosePlaylist',
])
const props = defineProps({
  playlistStyle: {
    type: String,
    required: false,
  },
})

const pinnedPlaylists = ref([])

// Handlers
const onChoosePlaylistHandler = (e) => {
  emit('choosePlaylist', Number(e.currentTarget.id))
}

// Hooks
onMounted(async () => {
  pinnedPlaylists.value = await getFilteredItemList(
    'playlists',
    pinnedPlaylistIdList.value
  )
})
</script>
<template>
  <div class="h-full grid grid-cols-3 gap-x-6 gap-y-3" :class="playlistStyle">
    <div
      v-for="playlist in pinnedPlaylists"
      :style="{
        backgroundImage: 'url(' + encodeURI(playlist.background) + ')',
      }"
      :key="playlist.id"
      :id="playlist.id"
      @click="onChoosePlaylistHandler"
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
