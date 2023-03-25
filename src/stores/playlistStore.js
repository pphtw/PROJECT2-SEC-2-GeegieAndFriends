import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlaylistStore = defineStore('playlist', () => {
  // State
  const selectedPlaylistId = ref(1)
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
    selectedPlaylistId,
    likedTracks,
    pinnedPlaylistIdList,
    checkFavorites,
    addToFavorites,
  }
})
