<script setup>
import { computed, ref } from 'vue'
import SingleTrack from '../UI/organisms/SingleTrack.vue'
import MusicPlayerCard from '../UI/organisms/MusicPlayerCard.vue'
import NavigationBar from '../UI/organisms/NavigationBar.vue'
import PlaylistCarousel from '../UI/organisms/PlaylistCarousel.vue'
import FilterSection from '../UI/molecules/FilterSection.vue'
import SearchBar from '../UI/molecules/SearchBar.vue'
import { getAllTracks } from '@/lib/getData'
import ContentSection from '../templates/ContentSection.vue'
import { storeToRefs } from 'pinia'
import { useSearchStore } from '@/stores/searchStore'
import TrackList from '../UI/organisms/TrackList.vue'
import { useControllerStore } from '@/stores/controllerStore'

const searchStore = useSearchStore()
const controllerStore = useControllerStore()

const { filteredList, regex } = storeToRefs(searchStore)
const { chooseTrack } = controllerStore

// Definition
const emit = defineEmits(['chooseTrack'])

const searchHandler = (input) => {
  regex.value = new RegExp(`${input}`, 'ig')
  console.log(regex.value)
  console.log(
    getAllTracks()
      .filter(
        (track) =>
          track.name.match(regex.value) ||
          track.keywords.toString().replace(',', ' ').match(regex.value)
      )
      .map((track) => track.trackId)
  )
}

// handler
const onChooseTrackClick = (e) => {
  chooseTrack(e.currentTarget.id)
  emit('chooseTrack', 300)
}
</script>

<template>
  <div class="container-gradient w-screen h-screen flex flex-row bg-[#3f5586]">
    <NavigationBar />
    <div
      class="w-full h-full px-[4vw] py-8 gap-y-8 gap-x-[4vw] grid grid-cols-4"
    >
      <div class="flex flex-col col-span-3 min-h-full">
        <!-- #SearchBarSection -->
        <SearchBar class="h-full" @searchEvent="searchHandler" />

        <!-- #FilterSection -->
        <FilterSection class="h-fit" />

        <!-- #TrackSection -->
        <ContentSection class="min-h-0">
          <TrackList
            :tracklist="filteredList"
            @choose-track="(e) => onChooseTrackClick(e)"
          />
        </ContentSection>
      </div>

      <div class="h-full flex flex-col gap-y-3">
        <!-- #PlaylistSection -->
        <div class="h-2/5">
          <PlaylistCarousel />
        </div>

        <!-- #MusicPlayerCardSection -->
        <div class="h-3/5">
          <MusicPlayerCard />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-gradient {
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
