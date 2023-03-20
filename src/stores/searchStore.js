import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getAllTracks } from '../lib/getData.js'

export const useSearchStore = defineStore('search', () => {
  const filterType = [
    'All',
    'Playlists',
    'Profile',
    'Artists',
    'Song',
    'Albums',
  ]

  const selectedFilterIndex = ref(0)
  const regex = ref('')

  const filteredList = computed(() =>
    getAllTracks().filter(
      (track) =>
        track.name.match(regex.value) ||
        track.keywords.toString().replace(',', ' ').match(regex.value)
    )
  )

  return {
    filterType,
    selectedFilterIndex,
    filteredList,
    regex,
  }
})
