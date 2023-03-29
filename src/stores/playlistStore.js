import {acceptHMRUpdate, defineStore} from 'pinia'
import { ref } from 'vue'
import {useControllerStore} from "@/stores/controllerStore";

export const usePlaylistStore = defineStore('playlist', () => {
  // State
  const likedTracks = ref([])
  const pinnedPlaylistIdList = ref([1, 3, 4, 5, 7, 8])

  // Actions
  const checkFavorites = (trackId) => {
    return likedTracks.value.includes(trackId) // Boolean
  }
  const addToFavorites = (trackId) => {
    if (checkFavorites(trackId)) {
      likedTracks.value.splice(likedTracks.value.indexOf(trackId), 1)
    } else {
      likedTracks.value.push(trackId)
    }
    localStorage.setItem('likedTracks', JSON.stringify(likedTracks.value))
  }

  return {
    likedTracks,
    pinnedPlaylistIdList,
    checkFavorites,
    addToFavorites,
  }
})
if (import.meta.hot){
  import.meta.hot.accept(acceptHMRUpdate(usePlaylistStore,import.meta.hot))
}