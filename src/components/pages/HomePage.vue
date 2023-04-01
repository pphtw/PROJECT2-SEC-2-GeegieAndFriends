<script setup>
import { ref, watch, onMounted, toRaw } from 'vue'
import { useControllerStore } from '@/stores/controllerStore'
import { useOverlayStore } from '@/stores/overlayStore'

import MusicPlayerCard from '../UI/organisms/MusicPlayerCard.vue'
import SectionHeader from '@/components/UI/atoms/SectionHeader.vue'
import ContentSection from '@/components/templates/ContentSection.vue'
import PlaylistCarousel from '@/components/UI/organisms/PinnedPlaylistGrid.vue'
import TrackList from '../UI/organisms/TrackList.vue'
import PageTemplate from '@/components/templates/PageTemplate.vue'
import TrackService from '@/lib/trackService'
import PlaylistService from '@/lib/playlistService'
import { storeToRefs } from 'pinia'
import MusicPlayerCardLoading from '@/components/UI/atoms/MusicPlayerCardLoading.vue'
import PlaylistCarouselLoading from '@/components/UI/atoms/PlaylistCarouselLoading.vue'
import TrackListLoading from '@/components/UI/atoms/TrackListLoading.vue'

const trackService = new TrackService()
const playlistService = new PlaylistService()
// Use Store
const controllerStore = useControllerStore()
const overlayStore = useOverlayStore()

const { chooseTrack } = controllerStore
const { overlayPlaylistId } = storeToRefs(overlayStore)

// Definition
const emit = defineEmits([
  'progressBarMouseMove',
  'progressBarMouseUp',
  'chooseTrack',
  'autoPlayPause',
])
// HomePage.vue
const selectedPlaylistId = ref(
  Number(JSON.parse(localStorage.getItem('selectedPlaylistId')) ?? 1)
)
const selectedPlaylist = ref({})
const selectedPlaylistName = ref('Loading Songs...')
const selectedPlaylistTracks = ref([])
const isLoading = ref(true)
watch(selectedPlaylistId, async (playlistId) => {
  isLoading.value = true
  selectedPlaylist.value = await trackService.getItemById(
    'playlists',
    playlistId
  )
  selectedPlaylistName.value = selectedPlaylist.value.name
  selectedPlaylistTracks.value = await playlistService.getPlaylistTrackList(
    playlistId
  )
  selectedPlaylistTracks.value = selectedPlaylist.value.tracks.map((id) =>
    selectedPlaylistTracks.value.find((track) => track.id === id)
  )
  localStorage.setItem(
    'selectedPlaylistId',
    JSON.stringify(selectedPlaylistId.value)
  )
  isLoading.value = false
})

// Handlers
const onChooseTrackClick = (e, playlistId) => {
  chooseTrack(e.currentTarget.id, playlistId)
  emit('chooseTrack', 300)
}

onMounted(async () => {
  isLoading.value = true
  if (
    overlayPlaylistId.value !== null &&
    selectedPlaylistId.value !== overlayPlaylistId.value
  ) {
    selectedPlaylistId.value = overlayPlaylistId.value
    localStorage.setItem(
      'selectedPlaylistId',
      JSON.stringify(selectedPlaylistId.value)
    )
  } else
    selectedPlaylistName.value = (
      await trackService.getItemById('playlists', 1)
    ).name

  selectedPlaylistTracks.value = await playlistService.getPlaylistTrackList(1)
  isLoading.value = false
})
</script>

<template>
  <PageTemplate
    content-style="grid-cols-[minmax(18rem,1fr)_3fr] grid-rows-[2fr_5fr]"
  >
    <ContentSection class="col-span-2 min-h-full">
      <template v-slot:header>
        <div class="flex flex-row justify-between">
          <SectionHeader input-text-header="Your Style" />
        </div>
      </template>
      <template v-if="isLoading">
        <PlaylistCarouselLoading />
      </template>
      <template v-else>
        <PlaylistCarousel
          @choose-playlist="
            (id) => {
              selectedPlaylistId = id
            }
          "
        />
      </template>
    </ContentSection>
    <ContentSection>
      <template v-slot:header>
        <SectionHeader input-text-header="Now Playing" />
      </template>
      <template v-if="isLoading">
        <MusicPlayerCardLoading />
      </template>
      <template v-else>
        <MusicPlayerCard @autoPlayPause="$emit('autoPlayPause')" />
      </template>
    </ContentSection>

    <!-- #MusicListSection -->
    <ContentSection class="min-h-0">
      <template v-slot:header>
        <SectionHeader :input-text-header="selectedPlaylistName" />
      </template>
      <template v-if="isLoading">
        <TrackListLoading />
      </template>
      <template v-else>
        <TrackList
          :trackList="selectedPlaylistTracks"
          :playlist-id="selectedPlaylistId"
          @choose-track="(e, playlistId) => onChooseTrackClick(e, playlistId)"
        />
      </template>
    </ContentSection>
  </PageTemplate>
</template>

<style scoped>
:deep(.container-gradient) {
  background-image: linear-gradient(
    0deg,
    hsl(228deg 39% 29%) 0%,
    hsl(228deg 39% 32%) 33%,
    hsl(229deg 39% 34%) 47%,
    hsl(230deg 39% 37%) 58%,
    hsl(230deg 39% 40%) 67%,
    hsl(231deg 39% 43%) 74%,
    hsl(232deg 38% 46%) 81%,
    hsl(233deg 38% 49%) 87%,
    hsl(235deg 41% 53%) 93%,
    hsl(236deg 46% 56%) 100%
  );
}
</style>
