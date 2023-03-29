<script setup>
import { useOverlayStore } from '@/stores/overlayStore'
import { storeToRefs } from 'pinia'
import { watch, ref, inject, onMounted } from 'vue'
import { useControllerStore } from '@/stores/controllerStore'

import TrackList from './TrackList.vue'
import TrackService from '@/lib/trackService'
import PlaylistService from '@/lib/playlistService'
import ContentSection from '../../templates/ContentSection.vue'

const overlayStore = useOverlayStore()
const { openCreateOverlay, overlayPlaylistId } = storeToRefs(overlayStore)
const { hideCreateOverlay } = overlayStore

const controllerStore = useControllerStore()
// const { isPlaying } = storeToRefs(controllerStore)
// const { chooseTrack, togglePlayPause } = controllerStore

const trackService = new TrackService()
const playlistService = new PlaylistService()

const createPlaylist = ref({})
const tracks = ref({})
const selectedTracks = ref([])
const selectedTrackList = ref({})
const trackId = ref(null)

const checkSelectedTrack = (id) => {
  return selectedTracks.value.includes(id)
}
const unChooseTrackHandler = (e) => {
  const trackId = Number(e.currentTarget.id)
  selectedTracks.value.splice(selectedTracks.value.indexOf(trackId), 1)
}
const onChooseTrackHandler = (e) => {
  trackId.value = Number(e.currentTarget.id)
  if (!checkSelectedTrack(trackId.value)) {
    selectedTracks.value.push(trackId.value)
    tracks.value.splice(
      tracks.value.findIndex((track) => track.id === trackId.value),
      1
    )
  } else {
    selectedTracks.value.splice(selectedTracks.value.indexOf(trackId.value), 1)
  }
}

watch(selectedTracks.value, async (id) => {
  if (selectedTracks.value.length >= 0) {
    selectedTrackList.value = await trackService.getFilteredItemList(
      'tracks',
      id
    )
    console.log(id)
  }
})

onMounted(async () => {
  tracks.value = await playlistService.getPlaylistTrackList(1)
  createPlaylist.value = {
    id: '',
    name: '',
    background: '',
    tracks: [],
    owner: '',
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div
        v-if="openCreateOverlay"
        class="absolute top-0 left-0 w-screen h-screen bg-gray-900/50 flex items-center justify-center z-[999]"
        @click.self="hideCreateOverlay"
      >
        <div
          class="grid grid-rows-[1fr_2fr] background-overlay shadow-xl w-[60%] h-full overflow-y-scroll"
          style="max-width: 1000px"
        >
          <div class="w-full min-h-full row-span-1 px-10 py-5">
            <ContentSection class="min-h-full">
              <label
                for="playlist_name"
                class="flex gap-2 items-center mb-2 font-medium text-white text-xl w-full"
                >Playlist Name :

                <input
                  type="text"
                  id="playlist_name"
                  class="grow p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500"
                  placeholder="J-Pop"
                  required
              /></label>
              <div class="w-full h-full bg-white rounded-xl overflow-y-scroll">
                <TrackList
                  class="grid grid-cols-3 gap-3 p-5 no-scrollbar-full"
                  :track-list="selectedTrackList"
                  @chooseTrack="unChooseTrackHandler"
                />
              </div>
            </ContentSection>
          </div>
          <div class="w-full min-h-full row-span-1 px-10 py-5">
            <ContentSection class="h-full"
              ><TrackList
                @chooseTrack="onChooseTrackHandler"
                :track-list="tracks"
            /></ContentSection>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.background-overlay {
  background: linear-gradient(180deg, #162750 0%, #171717 100%);
}
.v-enter-active {
  transition: opacity 0.3s ease-in;
}

.v-leave-active {
  transition: opacity 0.3s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
