<script setup>
import { computed, inject, reactive, ref } from 'vue'

import NavigationBar from '@/components/UI/organisms/NavigationBar.vue'
import TrendingList from '../UI/organisms/TrendingList.vue'
import { getPlaylist, getTrack, getTrackIdList } from '@/utils/getTracksData'
import MusicPlayerCard from '../UI/organisms/MusicPlayerCard.vue'
import SectionHeader from '@/components/UI/atoms/SectionHeader.vue'
import ContentSection from '@/components/templates/ContentSection.vue'
import metadata from '@/assets/metadata.json'
const playlistData = metadata.playlists
const musicQueue = inject('musicQueue')

// Definition
const emit = defineEmits(['progress-bar-mouse-move', 'progress-bar-mouse-up'])
const props = defineProps({
  isProgressBarClicked: {
    type: Boolean,
    required: true,
  },
})

const onMouseMove = (e) => {
  if (props.isProgressBarClicked) {
    emit('progress-bar-mouse-move', e)
  }
}
const onMouseUp = (e) => {
  emit('progress-bar-mouse-up', e)
}
const playlistName = computed(() => {
  return getPlaylist(musicQueue.currentPlaylistId).name
})
</script>

<template>
  <div
    class="flex flex-col justify-end sm:flex-row w-screen h-screen sm:h-screen sm:px-0 bg-[#162750]"
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
      class="container-gradient max-sm:grow order-1 sm:order-2 w-full sm:w-[94.6%] h-fit sm:h-full gap-[4%] sm:px-[5%] sm:py-0 py-[5%] flex flex-col sm:justify-center justify-end"
    >
      <ContentSection>
        <template v-slot:header>
          <div class="grid grid-cols-2 pb-3">
            <SectionHeader input-text-header="Your Style" />
            <div class="col-span-1 flex justify-end gap-2">
              <!-- #NextButton&PreviousButton -->
              <PreviousPageHandler @click="previousPageHandler" />
              <NextPageHandler @click="nextPageHandler" />
            </div>
          </div>
        </template>
      </ContentSection>
      <!-- #MusicPlayer&Trending -->
      <div
        class="h-fit sm:h-[62%] grid grid-rows-[60%-40%] max-sm:grow px-4 sm:px-0 sm:grid sm:grid-rows-1 grid-cols-1 sm:grid-cols-[20rem_1fr_1fr_1fr] gap-0 sm:gap-10"
      >
        <!-- #MusicPlayerCard #NowPlaying -->
        <ContentSection>
          <template v-slot:header>
            <SectionHeader input-text-header="Now Playing" />
          </template>
          <MusicPlayerCard />
        </ContentSection>

        <!-- #TrendingSection -->
        <ContentSection>
          <template v-slot:header>
            <SectionHeader :input-text-header="playlistName" />
          </template>
          <TrendingList />
        </ContentSection>
      </div>
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
