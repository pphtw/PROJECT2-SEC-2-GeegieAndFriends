import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
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
  const filteredList = ref([])

  const checkKeywords = (keyword) => keyword.match(regex.value)

  watch(regex, async (regex) => {
    const tracks = await getAllTracks()
    filteredList.value = tracks
      .filter((track) => track.name.match(regex.value))
      .concat(tracks.filter((track) => track.keywords.some(checkKeywords)))
  })

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
