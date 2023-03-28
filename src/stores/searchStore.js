import { defineStore } from 'pinia'
import { ref, watch, onMounted } from 'vue'
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
  const filteredTrackList = ref([])
  const filteredPlaylists = ref([])

  //Function
  const checkKeywords = (keyword) => keyword.match(regex.value)

  onMounted(async () => {
    filteredTrackList.value = await getAllItems('tracks')
    filteredPlaylists.value = await getAllItems('playlists')
  })

  watch(regex, async (regex) => {
    const tracks = await getAllItems('tracks')
    filteredTrackList.value = new Set(
      tracks
        .filter((track) => track.name.match(regex))
        .concat(tracks.filter((track) => track.keywords.some(checkKeywords)))
    )
  })

  watch(regex, async (regex) => {
    filteredPlaylists.value = (await getAllItems('playlists')).filter((e) =>
      e.name.match(regex)
    )
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
  }
})
