import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getPlaylist, getTrackList } from '@/lib/getData'

export const usePlaylistStore = defineStore('playlist', () => {
  // State
  const selectedPlaylistId = ref(1)
  const likedTracks = ref([])
  const pinnedPlaylist = ref([1, 3, 4, 5, 7, 8])

  // Getters
  const selectedPlaylistName = computed(
    () => getPlaylist(selectedPlaylistId.value).name
  )
  const selectedPlaylist = computed({
    get: () => getTrackList(selectedPlaylistId.value),
    set: (playlistId) => {
      selectedPlaylistId.value = Number(playlistId)
    },
  })
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

  const mappedPlaylists = computed(() =>
    pinnedPlaylist.value.map((playlistId) => getPlaylist(playlistId))
  )

  return {
    mappedPlaylists,
    selectedPlaylistId,
    likedTracks,
    pinnedPlaylist,
    selectedPlaylistName,
    selectedPlaylist,
    checkFavorites,
    addToFavorites,
  }
})
