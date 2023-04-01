<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useSearchStore } from '@/stores/searchStore'
import { useControllerStore } from '@/stores/controllerStore'
// Service
import TrackService from '@/lib/trackService'
// Components
import MusicPlayerCard from '../UI/organisms/MusicPlayerCard.vue'
import PinnedPlaylistGrid from '../UI/organisms/PinnedPlaylistGrid.vue'
import FilterSection from '../UI/molecules/FilterSection.vue'
import SearchBar from '../UI/molecules/SearchBar.vue'
import ContentSection from '../templates/ContentSection.vue'
import { storeToRefs } from 'pinia'
import TrackList from '../UI/organisms/TrackList.vue'
import PageTemplate from '@/components/templates/PageTemplate.vue'
import SectionHeader from '@/components/UI/atoms/SectionHeader.vue'
import PlaylistGrid from '../UI/organisms/PlaylistGrid.vue'
import UserService from '@/lib/userService'
import { useUserStore } from '@/stores/userStore'
import { ref, watch, onMounted } from 'vue'
import TrackService from '@/lib/trackService'

const userService = new UserService()
const trackService = new TrackService()

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const controllerStore = useControllerStore()


const { chooseTrack } = controllerStore

//ref
const selectedFilterIndex = ref(0)
const regex = ref('')
const filteredTrackList = ref([])
const filteredPlaylists = ref([])


onMounted(async () => {
  filteredTrackList.value = await trackService.getAllItems('tracks')
  filteredPlaylists.value = (
    await trackService.getAllItems('playlists')
  ).filter((playlist) => playlist.name !== 'Liked Song')
})
// Definition
const emit = defineEmits(['chooseTrack'])

//Function
const checkKeywords = (keyword) => keyword.match(regex.value)
const setSelectedFilterIndex = (index) => {
  selectedFilterIndex.value = index
}

onMounted(async () => {
  filteredTrackList.value = await trackService.getAllItems('tracks')
  filteredPlaylists.value = await trackService.getAllItems('playlists')
})

//watcher
watch(regex, async (regex) => {
  const tracks = await trackService.getAllItems('tracks')
  filteredTrackList.value = new Set(
    tracks
      .filter((track) => track.name.match(regex))
      .concat(tracks.filter((track) => track.keywords.some(checkKeywords)))
  )
})

watch(regex, async (regex) => {
  filteredPlaylists.value = (
    await trackService.getAllItems('playlists')
  ).filter((e) => e.name.match(regex))
})

// Handlers
const onChooseTrackClick = (e, playlistId) => {
  chooseTrack(e.currentTarget.id, playlistId)
  emit('chooseTrack', 300)
}

const searchHandler = (input) => {
  let pattern = input
    .replace(/\W{1,}/gi, ' ')
    .split(/\s/)
    .filter((e) => e)

  regex.value = new RegExp(`^${pattern.join(' ')}`, 'ig')
}
onMounted(async () => {})
</script>

<template>
  <PageTemplate
    content-style="grid-cols-[3fr_minmax(18rem,1fr)] grid-rows-[2fr_5fr]"
  >
    <div class="flex flex-col j row-span-2 h-full">
      <!-- #SearchBarSection -->
      <div class="flex flex-col h-fit">
        <SearchBar @searchEvent="searchHandler" class="w-full" />

        <!-- #FilterSection -->
        <FilterSection
          class="h-fit"
          @setFilter="setSelectedFilterIndex"
          :selectedFilterIndex="selectedFilterIndex"
        />
      </div>
      <!-- #ContentSection -->
      <div class="min-h-0">
        <div
          v-if="selectedFilterIndex === 0"
          class="grid grid-cols-2 gap-2 h-full"
        >
          <ContentSection class="min-h-0">
            <template v-slot:header>
              <div class="flex flex-row justify-between">
                <SectionHeader input-text-header="Songs" />
              </div>
            </template>
            <TrackList
              :trackList="filteredTrackList"
              @choose-track="
                (e, playlistId) => onChooseTrackClick(e, playlistId)
              "
            />
          </ContentSection>
          <ContentSection class="min-h-0 w-full">
            <template v-slot:header>
              <div class="flex flex-row">
                <SectionHeader input-text-header="Playlists" />
              </div>
            </template>
            <PlaylistGrid
              :playlists="filteredPlaylists"
              cols="grid-cols-3"
              :searchPageIsOpen="true"
            />
          </ContentSection>
        </div>

        <ContentSection v-else-if="selectedFilterIndex === 1">
          <PlaylistGrid
            :playlists="filteredPlaylists"
            :searchPageIsOpen="true"
            cols="grid-cols-5"
          />
        </ContentSection>

        <ContentSection v-else-if="selectedFilterIndex === 4">
          <TrackList
            :trackList="filteredTrackList"
            @choose-track="(e, playlistId) => onChooseTrackClick(e, playlistId)"
          />
        </ContentSection>
      </div>
    </div>

    <ContentSection>
      <PinnedPlaylistGrid />
    </ContentSection>
    <ContentSection>
      <MusicPlayerCard />
    </ContentSection>
  </PageTemplate>
</template>

<style scoped>
:deep(.container-gradient) {
  background-image: linear-gradient(
    180deg,
    hsl(228deg 39% 29%) 0%,
    hsl(233deg 32% 35%) 19%,
    hsl(239deg 27% 40%) 34%,
    hsl(245deg 25% 45%) 46%,
    hsl(250deg 24% 50%) 57%,
    hsl(256deg 28% 54%) 67%,
    hsl(262deg 33% 59%) 76%,
    hsl(267deg 39% 64%) 84%,
    hsl(272deg 47% 68%) 92%,
    hsl(278deg 57% 73%) 100%
  );
}
</style>
