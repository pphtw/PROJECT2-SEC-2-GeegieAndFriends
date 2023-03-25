import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getAllTracks, getAllPlaylists } from '@/lib/getData'

export const useSearchStore = defineStore('search', () => {
  //Definition
  const filterType = [
    'All',
    'Playlists',
    'Profile',
    'Artists',
    'Song',
    'Albums',
  ]

  //ref
  const selectedFilterIndex = ref(0)
  const regex = ref('')

  //Function
  const checkKeywords = (keyword) => keyword.match(regex.value)

  //DOM
  const filteredTracklist = computed(
    () =>
      new Set(
        getAllTracks()
          .filter((e) => e.name.match(regex.value))
          .concat(getAllTracks().filter((e) => e.keywords.some(checkKeywords)))
      )
  )

  const filteredPlaylist = computed(() =>
    getAllPlaylists().filter((e) => e.name.match(regex.value))
  )

  const setSelectedFilterIndex = (index) => {
    selectedFilterIndex.value = index
  }

  return {
    filterType,
    selectedFilterIndex,
    filteredTracklist,
    filteredPlaylist,
    regex,
    setSelectedFilterIndex,
  }
})
