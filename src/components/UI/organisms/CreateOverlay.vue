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
const selectedTrackList = ref([])
const trackId = ref(null)

const unChooseTrackHandler = (e) => {
  const trackId = Number(e.currentTarget.id)
  tracks.value.push(
    selectedTrackList.value.splice(
      selectedTrackList.value.findIndex((track) => track.id === trackId),
      1
    )[0]
  )
}
const onChooseTrackHandler = (e) => {
  const trackId = Number(e.currentTarget.id)
  const filterTrack = tracks.value.filter((track) => track.id === trackId)

  if (!selectedTrackList.value.includes(filterTrack[0])) {
    selectedTrackList.value.push(
      tracks.value.splice(
        tracks.value.findIndex((track) => track.id === trackId),
        1
      )[0]
    )
    console.log(selectedTrackList.value)
  } else {
    selectedTrackList.value.splice(
      selectedTrackList.value.indexOf(filterTrack[0].id),
      1
    )
  }
}

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
          class="flex flex-col background-overlay shadow-xl w-[60%] h-full overflow-y-scroll no-scrollbar-full"
          style="max-width: 1000px"
        >
          <div class="w-full h-fit row-span-1 px-10 py-5">
            <ContentSection class="h-fit">
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
              <div class="w-full h-fit basis-36 bg-white rounded-xl">
                <TrackList
                  class="p-5 no-scrollbar-full"
                  :track-list="selectedTrackList"
                  @chooseTrack="unChooseTrackHandler"
                />
              </div>
            </ContentSection>
          </div>
          <div class="w-full h-fit row-span-1 px-10 py-5">
            <ContentSection class="h-fit"
              ><TrackList
                class="no-scrollbar-full"
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
