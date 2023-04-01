<script setup>
import { useOverlayStore } from '@/stores/overlayStore'
import { storeToRefs } from 'pinia'
import { watch, ref, inject, onMounted } from 'vue'
import { useControllerStore } from '@/stores/controllerStore'
import { useUserStore } from '@/stores/userStore'

import PreviousPageButton from '../atoms/PreviousPageButton.vue'
import PlayPauseButton from '../atoms/PlayPauseButton.vue'
import LikeButton from '../atoms/LikeButton.vue'
import MenuButton from '../atoms/MenuButton.vue'

import ContentSection from '../../templates/ContentSection.vue'
import TrackList from './TrackList.vue'
import TrackService from '@/lib/trackService'
import PlaylistService from '@/lib/playlistService'
import UserService from '@/lib/userService'
import ModalTemplate from '../../templates/ModalTemplate.vue'

const trackService = new TrackService()
const playlistService = new PlaylistService()
const userService = new UserService()

const overlayStore = useOverlayStore()
const { openPlaylistOverlay, overlayPlaylistId } = storeToRefs(overlayStore)
const { hidePlaylistOverlay } = overlayStore

const controllerStore = useControllerStore()
const { isPlaying } = storeToRefs(controllerStore)
const { chooseTrack, togglePlayPause } = controllerStore
const { toggleCreateOverlay } = overlayStore

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const audioElement = inject('audioElement')
const playlist = ref({})
const tracks = ref({})
const emit = defineEmits(['chooseTrack', 'deletePlaylist', 'updatePlaylist'])

const playlistUserName = ref(null)
const isOpen = ref(false)
watch(openPlaylistOverlay, async () => {
  if (openPlaylistOverlay.value) {
    playlist.value = await trackService.getItemById(
      'playlists',
      overlayPlaylistId.value
    )
    tracks.value = await playlistService.getPlaylistTrackList(
      overlayPlaylistId.value
    )
    if (playlist.value.owner === 1) {
      playlistUserName.value = 'Root'
    } else {
      playlistUserName.value = (
        await userService.getUserById(playlist.value.owner)
      ).firstName
      18
    }
  }
})

const onChooseTrackClick = (e, playlistId) => {
  chooseTrack(e.currentTarget.id, playlistId)
  emit('chooseTrack', 300)
}
const onClickOpenDeleteBtn = () => {
  isOpen.value = true
  console.log(playlist.value.name)
}
const onClickCloseDeleteBtn = () => {
  isOpen.value = false
}
const onDeletePlaylist = async () => {
  if (
    playlist.value.owner !== 1 &&
    playlist.value.owner === currentUser.value.id
  ) {
    await playlistService.deletePlaylist(overlayPlaylistId.value)
  }
  isOpen.value = false
  hidePlaylistOverlay()
  emit('deletePlaylist')
}

const onUpdatePlaylist = () => {
  playlist.value.id
}
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div
        v-if="openPlaylistOverlay"
        class="absolute top-0 left-0 w-screen h-screen bg-gray-900/50 flex items-center justify-center z-[999]"
        @click.self="hidePlaylistOverlay"
      >
        <div
          class="grid grid-rows-[1fr_2fr] background-overlay shadow-xl w-[60%] min-w-fit h-full overflow-y-scroll no-scrollbar-full"
        >
          <div class="md:flex w-full row-span-1 p-10">
            <ContentSection class="min-h-full">
              <template v-slot:header>
                <div class="flex flex-row justify-between">
                  <PreviousPageButton @click="hidePlaylistOverlay" />
                  <button
                    v-if="
                      playlist.owner !== 1 &&
                      currentUser.id === playlist.owner &&
                      playlist.name !== 'Liked Song'
                    "
                    class="bg-red-500 hover:bg-red-700 text-white font-bold rounded-full w-10"
                    @click="onClickOpenDeleteBtn"
                  >
                    <svg
                      class="scale-75"
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1l1.4 1.4ZM7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Z"
                      />
                    </svg>
                  </button>
                </div>
              </template>

              <div class="w-full h-full grid grid-cols-[1fr_2fr] gap-x-5">
                <div
                  class="bg-gray-300 aspect-square bg-center bg-no-repeat bg-cover w-full"
                  :style="{
                    backgroundImage:
                      'url(' + encodeURI(playlist.background) + ')',
                  }"
                ></div>
                <div class="flex h-full items-center">
                  <div class="grow text-left text-white pt-20">
                    <h1 class="text-6xl font-bold pb-5">
                      {{ playlist.name }} {{ '#' + playlist.id }}
                    </h1>
                    <p class="text-2xl font-semibold">
                      {{ '(' + playlistUserName + ')' }} |
                      {{ '(' + tracks.length + ')' }} Song
                    </p>
                  </div>
                </div>
              </div>
            </ContentSection>
          </div>
          <div class="md:flex w-full h-full row-span-1 p-10 pt-0">
            <ContentSection class="h-full">
              <template v-slot:header>
                <div
                  class="flex flex-row justify-start w-full gap-x-5 items-center"
                >
                  <button
                    class="[clip-path:circle()]"
                    @click="togglePlayPause(audioElement)"
                  >
                    <PlayPauseButton :is-active="isPlaying" class="w-20 h-20" />
                  </button>

                  <LikeButton
                    fill="#c493e1"
                    stroke="#c493e1"
                    class="w-10 h-10"
                  />
                  <MenuButton
                    fill="#FFFFFF"
                    class="w-10 h-10"
                    @click="$emit('updatePlaylist', playlist)"
                  />
                </div>
              </template>
              <div class="h-full">
                <TrackList
                  :track-list="tracks"
                  :playlist-id="overlayPlaylistId"
                  @chooseTrack="onChooseTrackClick"
                />
              </div>
            </ContentSection>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
  <ModalTemplate :show-modal="isOpen" @hide-modal="onClickCloseDeleteBtn">
    <div class="bg-white h-full rounded-2xl flex flex-col justify-around">
      <div class="h-fit">
        <h1 class="text-2xl font-bold text-center">
          Are you sure you want to delete this playlist ?
        </h1>
      </div>
      <div class="flex justify-center space-x-24">
        <button
          class="w-24 h-14 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded-2xl"
          @click="onClickCloseDeleteBtn"
        >
          No
        </button>
        <button
          class="w-24 h-14 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded-2xl"
          @click="onDeletePlaylist"
        >
          Yes
        </button>
      </div>
    </div>
  </ModalTemplate>
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
