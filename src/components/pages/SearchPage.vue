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
import SectionHeader from '@/components/UI/atoms/SectionHeader.vue'
import PlaylistGrid from '../UI/organisms/PlaylistGrid.vue'

const searchStore = useSearchStore()
const controllerStore = useControllerStore()
const { filteredPlaylists, filteredTrackList, regex, selectedFilterIndex } =
  storeToRefs(searchStore)

const { chooseTrack } = controllerStore

// Definition
const emit = defineEmits(['chooseTrack'])

// Handlers
const onChooseTrackClick = (e, playlistId) => {
  // console.log(playlistId)
  chooseTrack(e.currentTarget.id, playlistId)
  emit('chooseTrack', 300)
}

const searchHandler = (input) => {
  //replace special string with space
  let pattern = input
    .replace(/\W{1,}/gi, ' ')
    .split(/\s/)
    .filter((e) => e)

  regex.value = new RegExp(`^${pattern.join(' ')}`, 'ig')
}
</script>

<template>
  <PageTemplate
    content-style="grid-cols-[3fr_minmax(18rem,1fr)] grid-rows-[2fr_5fr]"
  >
    <div class="flex flex-col j row-span-2 h-full">
      <!-- #SearchBarSection -->
      <div class="flex flex-col h-fit">
        <SearchBar @searchEvent="searchHandler" class="w-full" />

        <!-- #FilterSection -->
        <FilterSection class="h-fit" />
      </div>
      <!-- #ContentSection -->
      <div class="min-h-0">
        <div
          v-if="selectedFilterIndex === 0"
          class="grid grid-cols-2 gap-2 h-full"
        >
          <ContentSection class="min-h-0">
            <template v-slot:header>
              <div class="flex flex-row justify-between">
                <SectionHeader input-text-header="Songs" />
              </div>
            </template>
            <TrackList
              :trackList="filteredTrackList"
              @choose-track="
                (e, playlistId) => onChooseTrackClick(e, playlistId)
              "
            />
          </ContentSection>
          <ContentSection class="min-h-0 w-full">
            <template v-slot:header>
              <div class="flex flex-row">
                <SectionHeader input-text-header="Playlists" />
              </div>
            </template>
            <PlaylistGrid :playlists="filteredPlaylists" />
          </ContentSection>
        </div>

        <ContentSection v-else-if="selectedFilterIndex === 1">
          <PlaylistGrid :playlists="filteredPlaylists" />
        </ContentSection>

        <ContentSection v-else-if="selectedFilterIndex === 4">
          <TrackList
            :trackList="filteredTrackList"
            @choose-track="(e, playlistId) => onChooseTrackClick(e, playlistId)"
          />
        </ContentSection>
      </div>
    </div>

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
    180deg,
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
