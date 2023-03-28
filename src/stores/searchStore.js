import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import TrackService from "@/lib/trackService";
const trackService = new TrackService()
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
    const tracks = await trackService.getAllItems('tracks')
    filteredList.value = new Set(
      tracks
        .filter((track) => track.name.match(regex))
        .concat(tracks.filter((track) => track.keywords.some(checkKeywords)))
    )
  })

  const filteredTrackList = computed(
    () =>
      new Set(
        trackService.getAllItems('tracks')
          .filter((e) => e.name.match(regex.value))
          .concat(
            trackService.getAllItems('tracks').filter((e) => e.keywords.some(checkKeywords))
          )
      )
  )

  const filteredPlaylist = ref([])
  watch(regex, async (regex) => {
    filteredPlaylist.value = (await trackService.getAllItems('playlists')).filter((e) =>
      e.name.match(regex)
    )
  })

  const setSelectedFilterIndex = (index) => {
    selectedFilterIndex.value = index
  }

  return {
    filterType,
    selectedFilterIndex,
    filteredList,
    // filteredTrackList,
    filteredPlaylist,
    regex,
    setSelectedFilterIndex,
  }
})
