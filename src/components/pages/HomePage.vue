<script setup>
import { computed, inject, reactive, ref } from 'vue'

import NavigationBar from '@/components/UI/organisms/NavigationBar.vue'
import TrendingList from '../UI/organisms/TrendingList.vue'
import {getPlaylist, getTrack, getTrackIdList} from '@/utils/getTracksData'
import MusicPlayerCard from '../UI/organisms/MusicPlayerCard.vue'
import SectionHeader from '@/components/UI/atoms/SectionHeader.vue'
import ContentSection from '@/components/templates/ContentSection.vue'
import PlaylistCarousel from "@/components/UI/organisms/PlaylistCarousel.vue";
import PreviousPageButton from "@/components/UI/atoms/previousPageButton.vue";
import NextPageButton from "@/components/UI/atoms/NextPageButton.vue";
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
const currentTargetId = (e) => {
  return getPlaylist(musicQueue.currentTarget)
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
      class="container-gradient w-full px-[4vw] py-8 gap-y-8 gap-x-[4vw] grid grid-cols-[minmax(18rem,1fr)_3fr] grid-rows-[2fr_5fr]"
    >
      <ContentSection class="col-span-2">
        <template v-slot:header>
          <div class="flex flex-row justify-between">
            <SectionHeader input-text-header="Your Style" />

            <div class="flex flex-row">
              <PreviousPageButton />
              <NextPageButton />
            </div>
          </div>
        </template>
        <PlaylistCarousel />
      </ContentSection>
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
