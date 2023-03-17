<script setup>
import HomePageButton from '../atoms/HomePageButton.vue'
import SearchPageButton from '../atoms/SearchPageButton.vue'
import PlaylistPageButton from '../atoms/PlaylistPageButton.vue'
import CreditPageButton from '../atoms/CreditPageButton.vue'
import SettingPageButton from '../atoms/SettingPageButton.vue'
</script>

<template>
  <div
    class="bg-[#162750] w-[4.5rem] flex flex-col shrink-0 justify-center items-center gap-8"
  >
    <!-- #HomePageButton -->
    <HomePageButton />
    <!-- #SearchPageButton -->
    <SearchPageButton
      stroke="#E5E5E5"
      transition="hover:scale-125 transition ease-in-out"
    />
    <!-- #PlaylistPageButton -->
    <PlaylistPageButton />
    <!-- #CreditPageButton -->
    <CreditPageButton />
    <!-- #SettingPageButton -->
    <SettingPageButton />
  </div>
</template>

<style scoped></style>
