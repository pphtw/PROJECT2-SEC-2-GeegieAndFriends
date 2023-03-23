import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getAllTracks } from '@/lib/getData'

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

  const checkKeywords = (keyword) => keyword.match(regex.value)

  const filteredList = computed(() =>
    getAllTracks()
      .filter((track) => track.name.match(regex.value))
      .concat(
        getAllTracks().filter((track) => track.keywords.some(checkKeywords))
      )
  )

  const setSelectedFilterIndex = (index) => {
    selectedFilterIndex.value = index
  }

  return {
    filterType,
    selectedFilterIndex,
    filteredList,
    regex,
    setSelectedFilterIndex,
  }
})
