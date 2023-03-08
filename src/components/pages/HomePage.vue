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
      class="container-gradient w-full px-16 py-8 gap-16 grid grid-cols-[1fr_3fr] grid-rows-[1fr_3fr]"
    >
      <ContentSection class="col-span-2">
        <!--        <template v-slot:header>-->
        <!--          <div class="grid grid-cols-2 pb-3">-->
        <!--            <SectionHeader input-text-header="Your Style" />-->
        <!--            <div class="col-span-1 flex justify-end gap-2">-->
        <!--              &lt;!&ndash; #NextButton&PreviousButton &ndash;&gt;-->
        <!--              <PreviousPageHandler @click="previousPageHandler" />-->
        <!--              <NextPageHandler @click="nextPageHandler" />-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </template>-->
      </ContentSection>
      <!-- #MusicPlayerCard #NowPlaying -->
      <ContentSection>
        <!--        <template v-slot:header>-->
        <!--          <SectionHeader input-text-header="Now Playing" />-->
        <!--        </template>-->
        <!--        <MusicPlayerCard />-->
      </ContentSection>
      <!-- #TrendingSection -->
      <ContentSection>
        <!--        <template v-slot:header>-->
        <!--          <SectionHeader :input-text-header="playlistName" />-->
        <!--        </template>-->
        <!--        <TrendingList />-->
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
