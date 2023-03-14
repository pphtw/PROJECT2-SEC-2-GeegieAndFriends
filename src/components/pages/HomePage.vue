<script setup>
import NavigationBar from '@/components/UI/organisms/NavigationBar.vue'
import SingleTrack from '../UI/organisms/SingleTrack.vue'
import MusicPlayerCard from '../UI/organisms/MusicPlayerCard.vue'
import SectionHeader from '@/components/UI/atoms/SectionHeader.vue'
import ContentSection from '@/components/templates/ContentSection.vue'
import PlaylistCarousel from '@/components/UI/organisms/PlaylistCarousel.vue'
import { queueStore, playlistStore } from '@/lib/store'

// Definition
const emit = defineEmits([
  'progressBarMouseMove',
  'progressBarMouseUp',
  'togglePlay',
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
  queueStore.chooseTrack(e.currentTarget.id)
  emit('togglePlay', 300)
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
    @keyup.right="trackSkipHandler"
    @keyup.left="trackSkipHandler(false)"
    @keyup.space="playerHandler"
    @keyup="onShuffleHandler"
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
          <SectionHeader
            :input-text-header="playlistStore.selectedPlaylistName"
          />
        </template>
        <div
          class="rounded-2xl no-scrollbar h-full scroll-smooth overflow-y-scroll"
        >
          <!-- #TrendingList -->
          <div
            class="flex items-center mb-1 h-20 bg-[#E5E5E5] hover:bg-[#D4D4D4] transition ease-in-out rounded-2xl overflow-clip cursor-pointer"
            v-for="(track, index) in playlistStore.selectedPlaylist"
            :key="track.trackId"
            :id="track.trackId"
            :class="{
              'is-playing': queueStore.currentTrack.trackId === track.trackId,
            }"
            @mousedown="$event.preventDefault()"
            @click="onChooseTrackClick"
          >
            <SingleTrack
              :playlist="playlistStore"
              :track="track"
              :trackIndex="index"
            />
          </div>
        </div>
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
