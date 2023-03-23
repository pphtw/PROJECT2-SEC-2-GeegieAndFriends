<script setup>
import NavigationBar from '@/components/UI/organisms/NavigationBar.vue'
import MusicPlayerCard from '../UI/organisms/MusicPlayerCard.vue'
import SectionHeader from '@/components/UI/atoms/SectionHeader.vue'
import ContentSection from '@/components/templates/ContentSection.vue'
import PlaylistCarousel from '@/components/UI/organisms/PlaylistCarousel.vue'
import TrackList from '../UI/organisms/TrackList.vue'
import { useControllerStore } from '@/stores/controllerStore'
import { usePlaylistStore } from '@/stores/playlistStore'
import { storeToRefs } from 'pinia'
import PageTemplate from '@/components/templates/PageTemplate.vue'

// Use Store
const playlistStore = usePlaylistStore()
const controllerStore = useControllerStore()

const { selectedPlaylistId, selectedPlaylistName, selectedPlaylist } =
  storeToRefs(playlistStore)
const { chooseTrack } = controllerStore

// Definition
const emit = defineEmits([
  'progressBarMouseMove',
  'progressBarMouseUp',
  'chooseTrack',
  'autoPlayPause',
])
const props = defineProps({
  isProgressBarClicked: {
    type: Boolean,
    required: true,
  },
})

// Handlers
const onChooseTrackClick = (e, playlistId) => {
  chooseTrack(e.currentTarget.id, playlistId)
  emit('chooseTrack', 300)
}
</script>

<template>
  <PageTemplate
    :is-progress-bar-clicked="isProgressBarClicked"
    content-style="grid-cols-[minmax(18rem,1fr)_3fr] grid-rows-[2fr_5fr]"
  >
    <ContentSection class="col-span-2 min-h-full">
      <template v-slot:header>
        <div class="flex flex-row justify-between">
          <SectionHeader input-text-header="Your Style" />
        </div>
      </template>
      <PlaylistCarousel />
    </ContentSection>
    <ContentSection>
      <template v-slot:header>
        <SectionHeader input-text-header="Now Playing" />
      </template>
      <MusicPlayerCard @autoPlayPause="$emit('autoPlayPause')" />
    </ContentSection>

    <!-- #TrendingSection -->
    <ContentSection class="min-h-full">
      <template v-slot:header>
        <SectionHeader :input-text-header="selectedPlaylistName" />
      </template>
      <TrackList
        :trackList="selectedPlaylist"
        :playlist-id="selectedPlaylistId"
        @choose-track="(e, playlistId) => onChooseTrackClick(e, playlistId)"
      />
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
