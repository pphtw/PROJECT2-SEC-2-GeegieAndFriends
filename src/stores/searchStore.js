import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { getAllTracks } from '@/lib/getData'

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
  const filteredList = ref([])

  const checkKeywords = (keyword) => keyword.match(regex.value)
  // const searchName = (searchArr) => {
  //   searchArr.filter((e) => e.name.match(regex.value))
  // }
  // const searchKeywords = (searchArr) => {
  //   searchArr.filter((e) => e.keywords.some(checkKeywords))
  // }

  watch(regex, async (regex) => {
    const tracks = await getAllTracks()
    filteredList.value = tracks
      .filter((track) => track.name.match(regex.value))
      .concat(tracks.filter((track) => track.keywords.some(checkKeywords)))
  })
  //DOM
  // const filteredTrackList = computed(
  //   () => new Set(searchName(allTracks).concat(searchKeywords(allTracks)))
  // )
  //
  // const filteredPlaylist = computed(() => searchName(allPlaylists))

  const setSelectedFilterIndex = (index) => {
    selectedFilterIndex.value = index
  }

  return {
    filterType,
    selectedFilterIndex,
    // filteredTrackList,
    // filteredPlaylist,
    regex,
    setSelectedFilterIndex,
  }
})
