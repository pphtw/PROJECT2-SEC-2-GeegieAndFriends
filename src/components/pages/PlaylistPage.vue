<script setup>
import { ref, onMounted, reactive, watchEffect } from 'vue'

import PageTemplate from '../templates/PageTemplate.vue'
import ContentSection from '../templates/ContentSection.vue'
import SectionHeader from '@/components/UI/atoms/SectionHeader.vue'

import PlaylistGrid from '../UI/organisms/PlaylistGrid.vue'
import UserService from '../../lib/userService'
import PlaylistService from '@/lib/playlistService'

import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

const { currentUser } = storeToRefs(userStore)

const playlistService = new PlaylistService()
const userService = new UserService()

const playlists = ref([])
const likedPlayList = reactive({
  id: 0,
  name: 'Liked Song',
  tracks: [],
  background:
    'https://img.freepik.com/free-vector/dark-gradient-background-with-copy-space_53876-99548.jpg',
  owner: 1,
})

const refreshPlaylist = async () => {
  if (Object.keys(currentUser.value).length !== 0) {
    playlists.value = await userService.getUserPlaylists(currentUser.value.id)
    playlists.value.unshift(
      playlists.value.splice(
        playlists.value.findIndex((e) => e.name === 'Liked Song'),
        1
      )[0]
    )
  } else {
    playlists.value = await userService.getUserPlaylists(1)
  }
}
const createLikedPlaylist = async () => {
  likedPlayList.tracks = currentUser.value.likedTracks
  likedPlayList.owner = currentUser.value.id
  await playlistService.createPlaylist(likedPlayList)
  playlists.value = await userService.getUserPlaylists(currentUser.value.id)
  refreshPlaylist()
}
const updateLikedPlaylist = async () => {
  const likeTrackId = playlists.value.find(
    (track) => track.name === 'Liked Song'
  ).id
  likedPlayList.id = likeTrackId
  likedPlayList.tracks = currentUser.value.likedTracks
  likedPlayList.owner = currentUser.value.id
  await playlistService.updatePlaylist(likeTrackId, likedPlayList)
  refreshPlaylist()
}
const checkLikedPlaylist = () => {
  return playlists.value.includes(
    playlists.value.find((track) => track.name === 'Liked Song')
  )
}
const deleteLikedPlaylist = async () => {
  await playlistService.deletePlaylist(
    playlists.value.find((track) => track.name === 'Liked Song').id
  )
  refreshPlaylist()
}
watchEffect(async () => {
  if (Object.keys(currentUser.value).length !== 0) {
    playlists.value = await userService.getUserPlaylists(currentUser.value.id)

    if (currentUser.value.likedTracks.length !== 0 && !checkLikedPlaylist()) {
      createLikedPlaylist()
      console.log('Create')
    } else if (
      currentUser.value.likedTracks.length !== 0 &&
      checkLikedPlaylist()
    ) {
      await updateLikedPlaylist()
      console.log('Update')
    } else if (
      currentUser.value.likedTracks.length === 0 &&
      checkLikedPlaylist()
    ) {
      deleteLikedPlaylist()
      console.log('Delete')
    }
  } else {
    playlists.value = await userService.getUserPlaylists(1)
  }
})
</script>

<template>
  <PageTemplate>
    <ContentSection class="min-h-full">
      <template v-slot:header>
        <div class="flex flex-row justify-between">
          <SectionHeader input-text-header="Your Library" /></div
      ></template>
      <PlaylistGrid
        @updatePlaylist="refreshPlaylist"
        @createPlaylist="refreshPlaylist"
        @deletePlaylist="refreshPlaylist"
        :playlists="playlists"
        cols="grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6"
      />
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
