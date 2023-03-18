<script setup>
import { computed, ref } from 'vue'
// import TrackList from '../UI/organisms/TrackList.vue'
import MusicPlayerCard from '../UI/organisms/MusicPlayerCard.vue'
import NavigationBar from '../UI/organisms/NavigationBar.vue'
// import PlaylistCarousel from '../UI/organisms/PlaylistCarousel.vue'
import FilterSection from '../UI/molecules/FilterSection.vue'
import SearchBar from '../UI/molecules/SearchBar.vue'
import { getAllTracks } from '../../lib/getData'

const searchKeyword = ref('')

const searchHandler = (input) => {
  console.log(typeof getAllTracks())
  searchKeyword.value = input

  console.log(
    getAllTracks().filter((track) =>
      track.name.toLowerCase().include(searchKeyword.value.toLowerCase())
    )
  )
}

// const filteredList = computed(() => {
//   return getAllTracks().filter((track) =>
//     track.name.toLowerCase().include(searchKeyword.value.toLowerCase())
//   )
// })
</script>

<template>
  <div class="w-screen h-screen flex flex-row bg-[#3f5586]">
    <NavigationBar />
    <div class="w-full px-[4vw] py-8 gap-y-8 gap-x-[4vw] grid grid-cols-4">
      <div class="col-span-3 gap-y-3">
        <!-- #SearchBarSection -->
        <SearchBar @searchEvent="searchHandler" />

        <!-- #FilterSection -->
        <div class="flex gap-2 py-4">
          <FilterSection />
        </div>

        <!-- #TrackSection -->
        <!-- <div v-for="(track, index) in filteredList" class="bg-red-500">
          <div class="w-fit">
            <h1 class="text-center font-bold w-12">{{ index + 1 }}</h1>
          </div>
          <SingleTrack :track="track" />
        </div> -->
      </div>

      <div>
        <!-- #PlaylistSection -->
        <div class="h-2/5">
          <!-- <PlaylistCarousel/> -->
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
