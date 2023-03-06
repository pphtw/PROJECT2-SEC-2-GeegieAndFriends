<script setup>
import HomePageButton from '../atoms/HomePageButton.vue'
import SearchPageButton from '../atoms/SearchPageButton.vue'
import PlaylistPageButton from '../atoms/PlaylistPageButton.vue'
import CreditPageButton from '../atoms/CreditPageButton.vue'
import SettingPageButton from '../atoms/SettingPageButton.vue'
</script>

<template>
  <div
    class="flex flex-row order-2 sm:order-1 sm:flex-col justify-center row-span-6 gap-5 items-center w-full sm:w-[5.4%] py-3 sm:py-0 h-fit sm:h-full max-sm:z-10 bg-[#162750]"
  >
    <!-- #HomePageButton -->
    <HomePageButton />
    <!-- #SearchPageButton -->
    <SearchPageButton />
    <!-- #PlaylistPageButton -->
    <PlaylistPageButton />
    <!-- #CreditPageButton -->
    <CreditPageButton />
    <!-- #SettingPageButton -->
    <SettingPageButton />
  </div>
</template>

<style scoped></style>
