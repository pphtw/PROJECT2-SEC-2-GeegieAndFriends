import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { ref, watch, onMounted } from 'vue'
import TrackService from '@/lib/trackService'
import { useControllerStore } from '@/stores/controllerStore'
import UserService from '@/lib/userService'
import { useUserStore } from '@/stores/userStore'

const userService = new UserService()
const trackService = new TrackService()

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)
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

  watch(regex, async (regex) => {
    const tracks = await trackService.getAllItems('tracks')
    filteredTrackList.value = new Set(
      tracks
        .filter((track) => track.name.match(regex))
        .concat(tracks.filter((track) => track.keywords.some(checkKeywords)))
    )
    filteredPlaylists.value = (
      await trackService.getAllItems('playlists')
    ).filter(
      (playlist) => playlist.name.match(regex) && playlist.name !== 'Liked Song'
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
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
}
