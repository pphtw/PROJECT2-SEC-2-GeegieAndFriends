<script setup>
import HomePageButton from '../atoms/HomePageButton.vue'
import SearchPageButton from '../atoms/SearchPageButton.vue'
import PlaylistPageButton from '../atoms/PlaylistPageButton.vue'
import { RouterLink } from 'vue-router'
import LoginLogoutButton from '@/components/UI/atoms/LoginLogoutButton.vue'
import { ref } from 'vue'
import LoginOverlay from '@/components/UI/organisms/LoginOverlay.vue'

const openLoginOverlay = ref(false)
const closeLoginOverlay = () => {
  openLoginOverlay.value = false;
};
const onLoginClicked = () => {
  openLoginOverlay.value = !openLoginOverlay.value
}
</script>

<template>
  <div
    class="bg-[#162750] w-[4.5rem] grid grid-flow-row grid-rows-[1fr_3rem_3rem_3rem_1fr] justify-center items-center gap-4"
  >
    <!-- #HomePageButton -->
    <RouterLink
      @mousedown.prevent
      to="/"
      class="row-start-2 h-[3rem] w-[4.5rem] items-center justify-center flex hover:scale-150 transition ease-in-out"
    >
      <HomePageButton />
    </RouterLink>
    <!-- #SearchPageButton -->
    <RouterLink
      @mousedown.prevent
      to="/search"
      class="row-start-3 h-[3rem] w-[4.5rem] items-center justify-center flex hover:scale-150 transition ease-in-out"
    >
      <SearchPageButton stroke="#E5E5E5" />
    </RouterLink>
    <!-- #PlaylistPageButton -->
    <RouterLink
      @mousedown.prevent
      to="/playlist"
      class="row-start-4 h-[3rem] w-[4.5rem] items-center justify-center flex hover:scale-150 transition ease-in-out"
    >
      <PlaylistPageButton />
    </RouterLink>
    <a
      @click="onLoginClicked"
      @mousedown.prevent
      class="self-end cursor-pointer row-start-5 h-[3rem] w-[4.5rem] mb-8 items-center justify-center flex hover:scale-150 transition ease-in-out"
    >
      <LoginLogoutButton />
    </a>
    <LoginOverlay
      :open="openLoginOverlay"
      @registration-success="closeLoginOverlay"
      @closeOverlay="openLoginOverlay = false"
    />
  </div>
</template>

<style scoped></style>
