<script setup>
import { computed, ref } from 'vue'
import SingleTrack from '../UI/organisms/SingleTrack.vue'
import MusicPlayerCard from '../UI/organisms/MusicPlayerCard.vue'
import NavigationBar from '../UI/organisms/NavigationBar.vue'
import PlaylistCarousel from '../UI/organisms/PlaylistCarousel.vue'
import FilterSection from '../UI/molecules/FilterSection.vue'
import SearchBar from '../UI/molecules/SearchBar.vue'
import { getAllTracks } from '../../lib/getData.js'
import ContentSection from '../templates/ContentSection.vue'
import { storeToRefs } from 'pinia'
import { useSearchStore } from '../../stores/searchStore.js'

const searchStore = useSearchStore()
const { filteredList, regex } = storeToRefs(searchStore)

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
</script>

<template>
  <div class="w-screen h-screen flex flex-row bg-[#3f5586]">
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
          <div
            class="rounded-2xl h-full no-scrollbar scroll-smooth overflow-y-scroll"
          >
            <div
              class="flex items-center mb-1 h-20 bg-[#E5E5E5] hover:bg-[#D4D4D4] transition ease-in-out rounded-2xl cursor-pointer"
              v-for="(track, index) in filteredList"
              :key="track.trackId"
              :id="track.trackId"
            >
              <div class="w-fit">
                <h1 class="text-center font-bold w-12">{{ index + 1 }}</h1>
              </div>
              <SingleTrack :track="track" />
            </div>
          </div>
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

<style scoped></style>
