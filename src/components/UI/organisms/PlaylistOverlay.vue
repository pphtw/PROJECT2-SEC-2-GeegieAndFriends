<script setup>
import ContentSection from '../../templates/ContentSection.vue'
import PreviousPageButton from '../atoms/PreviousPageButton.vue'
import PlayPauseButton from '../atoms/PlayPauseButton.vue'
import LikeButton from '../atoms/LikeButton.vue'
import MenuButton from '../atoms/MenuButton.vue'
import TrackList from './TrackList.vue'
import { useOverlayStore } from '@/stores/overlayStore'
import { storeToRefs } from 'pinia'
import { watch, ref } from 'vue'
import PlaylistService from '../../../lib/playlistService.js'
import TrackService from '../../../lib/trackService.js'
import { getPlaylistTrackList } from '../../../lib/getData'

const { getItemById } = new TrackService()
// const { getPlaylistTrackList } = new PlaylistService()
const overlayStore = useOverlayStore()
const playlist = ref({})
const tracks = ref({})
const { openPlaylistOverlay, overlayPlaylistId } = storeToRefs(overlayStore)
const { hidePlaylistOverlay } = overlayStore

watch(overlayPlaylistId, async (id) => {
  playlist.value = await getItemById('playlists', id)
  tracks.value = await getPlaylistTrackList(id)
})
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
          class="grid grid-rows-[1fr_2fr] background-overlay shadow-xl w-full h-full overflow-hidden"
          style="max-width: 1000px"
        >
          <div class="md:flex w-full row-span-1 p-10">
            <ContentSection class="min-h-full">
              <template v-slot:header>
                <div class="flex flex-row justify-between">
                  <PreviousPageButton @click="$emit('closeOverlay')" /></div
              ></template>

              <div class="w-full h-full grid grid-cols-[1fr_2fr] gap-x-5">
                <div
                  class="bg-gray-300 aspect-square w-full"
                  :style="{
                    backgroundImage:
                      'url(' + encodeURI(playlist.background) + ')',
                  }"
                ></div>
                <div class="flex h-full items-center">
                  <div class="grow text-left text-white pt-20">
                    <h1 class="text-6xl pb-5">
                      {{ playlist.name }} {{ '#' + playlist.id }}
                    </h1>
                    <p class="text-2xl">
                      {{ '(' + playlist.owner + ')' }} |
                      {{ '(' + tracks.length + ')' }} Song
                    </p>
                  </div>
                </div>
              </div>
            </ContentSection>
          </div>
          <div class="md:flex w-full min-h-full row-span-1 p-10 pt-0">
            <ContentSection class="h-full">
              <template v-slot:header>
                <div
                  class="flex flex-row justify-start w-full gap-x-5 items-center"
                >
                  <PlayPauseButton class="w-20 h-20" />
                  <LikeButton
                    fill="#c493e1"
                    stroke="#c493e1"
                    class="w-10 h-10"
                  />
                  <MenuButton fill="#FFFFFF" class="w-10 h-10" /></div
              ></template>
              <div class="min-h-0">
                <TrackList :track-list="tracks" />
              </div>
            </ContentSection>
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
