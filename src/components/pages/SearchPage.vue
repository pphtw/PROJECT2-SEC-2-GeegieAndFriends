<script setup>
import MusicPlayerCard from '../UI/organisms/MusicPlayerCard.vue'
import PlaylistCarousel from '../UI/organisms/PlaylistCarousel.vue'
import FilterSection from '../UI/molecules/FilterSection.vue'
import SearchBar from '../UI/molecules/SearchBar.vue'
import ContentSection from '../templates/ContentSection.vue'
import { storeToRefs } from 'pinia'
import { useSearchStore } from '@/stores/searchStore'
import TrackList from '../UI/organisms/TrackList.vue'
import PageTemplate from '@/components/templates/PageTemplate.vue'
import { useControllerStore } from '@/stores/controllerStore'

const searchStore = useSearchStore()
const controllerStore = useControllerStore()
// const playlistStore = usePlaylistStore()
const { filteredPlaylist, filteredTracklist, regex, selectedFilterIndex } =
  storeToRefs(searchStore)
// const { mappedPlaylists } = storeToRefs(playlistStore)
const { chooseTrack } = controllerStore

// Definition
const emit = defineEmits(['chooseTrack'])

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

const searchHandler = (input) => {
  //replace special string with space
  let pattern = input
    .replace(/\W{1,}/gi, ' ')
    .split(/\s/)
    .filter((e) => e)
  // console.log(pattern)

  regex.value = new RegExp(`^(${pattern.join(' ')})`, 'ig')
  console.log(regex.value)
}
</script>

<template>
  <PageTemplate
    :is-progress-bar-clicked="isProgressBarClicked"
    content-style="grid-cols-[3fr_minmax(18rem,1fr)] grid-rows-[2fr_5fr]"
  >
    <ContentSection class="flex flex-col row-span-2 min-h-full">
      <!-- #SearchBarSection -->
      <SearchBar class="h-full" @searchEvent="searchHandler" />

      <!-- #FilterSection -->
      <FilterSection class="h-fit" />

      <!-- #ContentSection -->
      <div v-if="selectedFilterIndex === 0"></div>
      <PlaylistCarousel
        v-else-if="selectedFilterIndex === 1"
        :shownPlaylist="filteredPlaylist"
      />
      <TrackList
        v-else-if="selectedFilterIndex === 4"
        :trackList="filteredTracklist"
        @choose-track="(e, playlistId) => onChooseTrackClick(e, playlistId)"
      />
    </ContentSection>
    <ContentSection>
      <PlaylistCarousel />
    </ContentSection>
    <ContentSection>
      <MusicPlayerCard />
    </ContentSection>
  </PageTemplate>
</template>

<style scoped>
:deep(.container-gradient) {
  background-image: linear-gradient(
    160deg,
    hsl(228deg 39% 29%) 0%,
    hsl(233deg 32% 35%) 19%,
    hsl(239deg 27% 40%) 34%,
    hsl(245deg 25% 45%) 46%,
    hsl(250deg 24% 50%) 57%,
    hsl(256deg 28% 54%) 67%,
    hsl(262deg 33% 59%) 76%,
    hsl(267deg 39% 64%) 84%,
    hsl(272deg 47% 68%) 92%,
    hsl(278deg 57% 73%) 100%
  );
}
</style>
