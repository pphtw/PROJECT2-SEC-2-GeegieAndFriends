import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { onMounted, ref, watch, watchEffect } from 'vue'
import { useControllerStore } from '@/stores/controllerStore'
import { useUserStore } from '@/stores/userStore'

import UserService from '@/lib/userService'

export const usePlaylistStore = defineStore('playlist', () => {
  const userService = new UserService()
  const userStore = useUserStore()
  const { currentUser } = storeToRefs(userStore)
  // State
  const likedTracks = ref([])
  const pinnedPlaylistIdList = ref([1, 3, 4, 5, 7, 8])

  watch(
    () => currentUser.value.likedTracks,
    (likedTracksArr) => {
      likedTracks.value = [...likedTracksArr]
      console.log(likedTracks.value)
    }
  )

  // Actions
  const checkFavorites = (trackId) => {
    if (trackId !== null && trackId !== undefined) {
      const id = Number(trackId)
      // return likedTracks.value.includes(trackId) // Boolean
      return likedTracks.value.includes(id) // Boolean
    }
  }
  const addToFavorites = async (trackId) => {
    const id = Number(trackId)
    if (Object.keys(currentUser.value).length !== 0) {
      if (!checkFavorites(id)) {
        likedTracks.value.push(id)
      } else {
        likedTracks.value.splice(likedTracks.value.indexOf(id), 1)
      }
      await userService.updateUserLikedTracks(
        currentUser.value.id,
        likedTracks.value
      )
    }

    // localStorage.setItem('likedTracks', JSON.stringify(likedTracks.value))
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
