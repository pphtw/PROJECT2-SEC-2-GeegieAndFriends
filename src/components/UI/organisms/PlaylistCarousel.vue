<script setup>
import { ref } from 'vue'
import metadata from '@/assets/metadata.json'

const playlistData = metadata.playlists
const playlistElement = ref(null)
const emit =  defineEmits(['nextPageHandler', 'previousPageHandler','onChoosePlaylist'])
const props = defineProps({
  playlist: {
    type: Object,
    required: true,
  }
})
const {playlist} = props
const nextPageHandler = () => {
  playlistElement.value.scrollLeft += 1400
  emit('nextPageHandler')
}
const previousPageHandler = () => {
  playlistElement.value.scrollLeft -= 1400
  emit('previousPageHandler')
}
const onChoosePlaylist = (e) => {
  playlist.selectedPlaylistId = Number(e.currentTarget.id)
  emit('onChoosePlaylist')
}
</script>
<template>
  <div
    class="grow relative overflow-x-auto scroll-smooth"
    ref="playlistElement"
  >
    <div
      class="h-full inline-grid grid-flow-col auto-cols-[minmax(18rem,1fr)] gap-8 justify-start"
    >
      <div
        v-for="playlist in playlistData"
        :style="{
          backgroundImage: 'url(' + encodeURI(playlist.background) + ')',
        }"
        :key="playlist['playlistId']"
        :id="playlist['playlistId']"
        @click="onChoosePlaylist"
        class="flex justify-center w-[18rem] cursor-pointer bg-blue-500 rounded-2xl hover:bg-blue-400 bg-cover"
        tabindex="-1"
      >
        <p
          class="text-white truncate text-lg font-semibold self-center text-center"
        >
          {{ playlist.name }}
        </p>
      </div>
    </div>
  </div>
  <!--  </div>-->
</template>
