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

  //data
  const allTracks = getAllTracks()
  const allPlaylists = getAllPlaylists()

  //Function
  const checkKeywords = (keyword) => keyword.match(regex.value)
  const searchName = (searchArr) => {
    searchArr.filter((e) => e.name.match(regex.value))
  }
  const searchKeywords = (searchArr) => {
    searchArr.filter((e) => e.keywords.some(checkKeywords))
  }

  //DOM
  const filteredTrackList = computed(
    () => new Set(searchName(allTracks).concat(searchKeywords(allTracks)))
  )

  const filteredPlaylist = computed(() => searchName(allPlaylists))

  const setSelectedFilterIndex = (index) => {
    selectedFilterIndex.value = index
  }

  return {
    filterType,
    selectedFilterIndex,
    filteredTrackList,
    filteredPlaylist,
    regex,
    setSelectedFilterIndex,
  }
})
