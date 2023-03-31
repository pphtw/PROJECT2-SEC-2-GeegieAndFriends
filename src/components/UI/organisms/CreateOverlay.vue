<script setup>
import { onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useOverlayStore } from '@/stores/overlayStore'
import { useControllerStore } from '@/stores/controllerStore'
import { useUserStore } from '@/stores/userStore'

import TrackList from './TrackList.vue'
import TrackService from '@/lib/trackService'
import PlaylistService from '@/lib/playlistService'
import ContentSection from '../../templates/ContentSection.vue'
import PreviousPageButton from '../atoms/PreviousPageButton.vue'

const overlayStore = useOverlayStore()
const { openCreateOverlay, overlayPlaylistId } = storeToRefs(overlayStore)
const { hideCreateOverlay } = overlayStore

const props = defineProps({
  updatePlaylist: {
    type: Boolean,
    required: false,
  },
})

//defineStores & Services
const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const trackService = new TrackService()
const playlistService = new PlaylistService()

const emit = defineEmits(['createPlaylist'])

//State
const createPlaylist = reactive({
  name: '',
  background: '',
  tracks: [],
  owner: '',
})
const tracks = ref({})
const selectedTrackList = ref([])

//Handler
const resetCreatePlaylist = async () => {
  createPlaylist.name = ''
  createPlaylist.background = ''
  createPlaylist.tracks = []
  createPlaylist.owner = ''

  tracks.value = await playlistService.getPlaylistTrackList(1)
  selectedTrackList.value = []
}
const createPlaylistHandler = async () => {
  createPlaylist.tracks = selectedTrackList.value.map((track) => track.id)
  createPlaylist.owner = currentUser.value.id
  if (Object.keys(currentUser.value).length !== 0) {
    await playlistService.createPlaylist(createPlaylist)
  }
  resetCreatePlaylist()
  hideCreateOverlay()
  emit('createPlaylist')
}
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
  } else {
    selectedTrackList.value.splice(
      selectedTrackList.value.indexOf(filterTrack[0].id),
      1
    )
  }
}

onMounted(async () => {
  tracks.value = await playlistService.getPlaylistTrackList(1)
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
          <div class="flex justify-between px-10 pt-5">
            <PreviousPageButton @click="hideCreateOverlay" />
            <button
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
              @click.once="createPlaylistHandler"
            >
              Create
            </button>
          </div>
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
                  v-model="createPlaylist.name"
                  required
              /></label>
              <label
                for="background"
                class="flex gap-2 items-center mb-2 font-medium text-white text-xl w-full"
                >Background URL :

                <input
                  type="text"
                  id="background"
                  class="grow p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500"
                  placeholder="URL background"
                  v-model="createPlaylist.background"
                  required
              /></label>
              <h1 class="font-medium text-white text-xl">Selected Track :</h1>
              <div class="w-full h-fit basis-36 bg-transparent/30 rounded-xl">
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
