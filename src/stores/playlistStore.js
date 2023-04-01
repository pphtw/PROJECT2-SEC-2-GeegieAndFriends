import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { ref, watch, watchEffect } from 'vue'
import { useUserStore } from '@/stores/userStore'

import UserService from '@/lib/userService'

export const usePlaylistStore = defineStore('playlist', () => {
  const userService = new UserService()
  const userStore = useUserStore()
  const { currentUser } = storeToRefs(userStore)
  // State
  const likedTracks = ref([])
  const likedPlaylists = ref([])
  const pinnedPlaylistIdList = ref([1, 3, 4, 5, 7, 8])

  watchEffect(() => {
    if (userStore.checkUserLoggedIn()) {
      likedTracks.value = [...currentUser.value.likedTracks]
      likedPlaylists.value = [...currentUser.value.likedPlaylists]
    }
  })

  // Actions
  const checkFavorites = (id, type = 'track') => {
    if (id !== null && id !== undefined) {
      const checkId = Number(id)
      if (type === 'track') {
        return likedTracks.value.includes(checkId) // Boolean
      } else if (type === 'playlist') {
        return likedPlaylists.value.includes(checkId)
      }
    }
  }
  const addToFavorites = async (id, type = 'track') => {
    const updateId = Number(id)
    if (userStore.checkUserLoggedIn()) {
      if (type === 'track') {
        if (!checkFavorites(updateId)) {
          likedTracks.value.push(updateId)
        } else {
          likedTracks.value.splice(likedTracks.value.indexOf(updateId), 1)
        }
        currentUser.value = await userService.updateUserLikedTracks(
          currentUser.value.id,
          likedTracks.value
        )
      } else if (type === 'playlist') {
        if (!checkFavorites(updateId, 'playlist')) {
          likedPlaylists.value.push(updateId)
        } else {
          likedPlaylists.value.splice(likedPlaylists.value.indexOf(updateId), 1)
        }
        currentUser.value = await userService.updateUserLikedPlaylist(
          currentUser.value.id,
          likedPlaylists.value
        )
      }
    }
  }

  return {
    likedTracks,
    pinnedPlaylistIdList,
    checkFavorites,
    addToFavorites,
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePlaylistStore, import.meta.hot))
}
