<script setup>
import { ref, onMounted, reactive, watchEffect } from 'vue'

import PageTemplate from '../templates/PageTemplate.vue'
import ContentSection from '../templates/ContentSection.vue'
import SectionHeader from '@/components/UI/atoms/SectionHeader.vue'

import PlaylistGrid from '../UI/organisms/PlaylistGrid.vue'
import TrackService from '@/lib/trackService'
import UserService from '../../lib/userService'
import PlaylistService from '@/lib/playlistService'

import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const trackService = new TrackService()
const playlistService = new PlaylistService()
const userService = new UserService()

const playlists = ref([])
const likedPlayList = reactive({
  id: 0,
  name: 'Liked Song',
  tracks: JSON.parse(localStorage.getItem('likedTracks')) ?? [],
  background:
    'https://img.freepik.com/free-vector/dark-gradient-background-with-copy-space_53876-99548.jpg',
})

const onCreatePlaylist = async () => {
  playlists.value = await userService.getUserPlaylists(currentUser.value.id)
}
watchEffect(async () => {
  if (currentUser.value !== null) {
    playlists.value = await userService.getUserPlaylists(currentUser.value.id)
  } else {
    playlists.value = await userService.getUserPlaylists(1)
  }
})
onMounted(async () => {
  // if (
  //   !playlists.value.includes(
  //     playlists.value.find((e) => e.name === 'Liked Song')
  //   )
  // ) {
  //   await playlistService.createPlaylist(likedPlayList)
  // }
})
</script>

<template>
  <PageTemplate>
    <ContentSection class="min-h-full">
      <template v-slot:header>
        <div class="flex flex-row justify-between">
          <SectionHeader input-text-header="Your Library" /></div
      ></template>
      <PlaylistGrid @createPlaylist="onCreatePlaylist" :playlists="playlists" />
    </ContentSection>
  </PageTemplate>
</template>

<style scoped>
:deep(.container-gradient) {
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
