import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { getAllItems } from '@/lib/getData'

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

  //Function
  const checkKeywords = (keyword) => keyword.match(regex.value)

  watch(regex, async (regex) => {
    const tracks = await getAllItems('tracks')
    filteredList.value = tracks
      .filter((track) => track.name.match(regex.value))
      .concat(tracks.filter((track) => track.keywords.some(checkKeywords)))
  })
  //DOM
  const filteredTrackList = computed(
    () =>
      new Set(
        getAllItems('tracks')
          .filter((e) => e.name.match(regex.value))
          .concat(
            getAllItems('tracks').filter((e) => e.keywords.some(checkKeywords))
          )
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
    // filteredTracklist,
    filteredPlaylist,
    regex,
    setSelectedFilterIndex,
  }
})
