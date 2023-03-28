import {defineStore, storeToRefs} from 'pinia'
import { ref, watch, onMounted } from 'vue'
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
  const filteredTrackList = ref([])
  const filteredPlaylists = ref([])
  const notFoundPlaylists = ref(false)
  const notFoundTrackList = ref(false)

  //Function
  const checkKeywords = (keyword) => keyword.match(regex.value)

  onMounted(async () => {
    filteredTrackList.value = await trackService.getAllItems('tracks')
    filteredPlaylists.value = await trackService.getAllItems('playlists')
  })

  watch(regex, async (regex) => {
    const tracks = await trackService.getAllItems('tracks')
    filteredTrackList.value = new Set(
      tracks
        .filter((track) => track.name.match(regex))
        .concat(tracks.filter((track) => track.keywords.some(checkKeywords)))
    )
    notFoundTrackList.value =
      filteredTrackList.value.length === 0 ? true : false
  })

  watch(regex, async (regex) => {
    filteredPlaylists.value = (await trackService.getAllItems('playlists')).filter((e) =>
      e.name.match(regex)
    )
    showMessageNotFound.value =
      notFoundTrackList.value.length === 0 ? true : false
  })

  const setSelectedFilterIndex = (index) => {
    selectedFilterIndex.value = index
  }

  return {
    filterType,
    selectedFilterIndex,
    filteredTrackList,
    filteredPlaylists,
    regex,
    setSelectedFilterIndex,
    notFoundTrackList,
    notFoundPlaylists,
  }
})
