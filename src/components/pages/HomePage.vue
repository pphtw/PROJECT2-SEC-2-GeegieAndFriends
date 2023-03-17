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

// Use Store
const playlistStore = usePlaylistStore()
const controllerStore = useControllerStore()

const { selectedPlaylistName } = storeToRefs(playlistStore)
const { chooseTrack, skipTrack, toggleShuffle } = controllerStore

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
const onChooseTrackClick = (e) => {
  chooseTrack(e.currentTarget.id)
  emit('chooseTrack', 300)
}

const onMouseMove = (e) => {
  if (props.isProgressBarClicked) {
    emit('progressBarMouseMove', e)
  }
}
const onMouseUp = (e) => {
  emit('progressBarMouseUp', e)
}
</script>

<template>
  <div
    class="w-screen h-screen flex flex-row bg-[#162750]"
    @keyup.right="skipTrack"
    @keyup.left="skipTrack(false)"
    @keyup.space="$emit('togglePlayPause')"
    @keyup="toggleShuffle"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    tabindex="-1"
  >
    <NavigationBar />
    <div
      class="container-gradient w-full h-full px-[4vw] py-8 gap-y-8 gap-x-[4vw] grid grid-cols-[minmax(18rem,1fr)_3fr] grid-rows-[2fr_5fr]"
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
        <TrackList @on-choose-track-click="(e) => onChooseTrackClick(e)" />
      </ContentSection>
    </div>
  </div>
</template>

<style scoped>
.is-playing,
.is-playing:hover {
  background-color: #eedff6;
}

.container-gradient {
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
