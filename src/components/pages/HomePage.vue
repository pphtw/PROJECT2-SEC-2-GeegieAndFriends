<script setup>
import { computed, reactive, ref, inject } from 'vue'

import NavigationBar from '@/components/UI/organisms/NavigationBar.vue'
import PlaylistCarousel from '@/components/UI/organisms/PlaylistCarousel.vue'
import LikeButton from '../UI/atoms/LikeButton.vue'
import MenuButton from '../UI/atoms/MenuButton.vue'
import { getPlaylist, getTrack, getTrackIdList } from '@/utils/getTracksData'
import { secToMin } from '@/utils/utils'
import metadata from '../../assets/metadata.json'
import MusicPlayerCard from '../UI/organisms/MusicPlayerCard.vue'
import SectionHeader from "@/components/UI/atoms/SectionHeader.vue";
import Timer from '@/components/UI/atoms/Timer.vue'
import ContentSection from '@/components/templates/ContentSection.vue'

const musicQueue = inject('musicQueue')

// Definition
const emit = defineEmits([
  'toggle-play',
  'progress-bar-mouse-move',
  'progress-bar-mouse-up',
])
const props = defineProps({
  isProgressBarClicked: {
    type: Boolean,
    required: true,
  },
})

const playlist = reactive({
  selectedPlaylistId: 1,
  selectedPlaylistName: computed(
    () => getPlaylist(playlist.selectedPlaylistId).name
  ),
  selectedPlaylist: computed(() =>
    getPlaylist(playlist.selectedPlaylistId).tracks.map((trackId) =>
      getTrack(trackId)
    )
  ),
  favourites: JSON.parse(localStorage.getItem('favourites')) ?? [],
})

// DOM Element
const tracksElement = ref(null)

// Handlers
const onChooseTrackClick = (e) => {
  const chooseTrackId = Number(e.currentTarget.id)
  if (musicQueue.currentPlaylistId !== playlist.selectedPlaylistId) {
    musicQueue.currentPlaylistId = playlist.selectedPlaylistId
    musicQueue.queue = [...getTrackIdList(musicQueue.currentPlaylistId)]
    musicQueue.defaultQueue = musicQueue.queue
    if (musicQueue.isShuffled) {
      musicQueue.toggleShuffle(true)
    }
  }
  musicQueue.skipToTrack(chooseTrackId)
  emit('toggle-play', 300)
  musicQueue.isPlaying = true
}
const onChoosePlaylist = (id) => {
  playlist.selectedPlaylistId = Number(id)
}
const onMouseMove = (e) => {
  if (props.isProgressBarClicked) {
    emit('progress-bar-mouse-move', e)
  }
}
const onMouseUp = (e) => {
  emit('progress-bar-mouse-up', e)
}

// Utils
const checkFavourite = (trackId) => {
  const arr = [...playlist.favourites]
  return arr.includes(trackId)
}


//Favorite
const onLikeHandler = (e, trackId) => {
  e.stopPropagation()
  if (checkFavourite(trackId)) {
    playlist.favourites.splice(playlist.favourites.indexOf(trackId), 1)
  } else {
    playlist.favourites.push(trackId)
  }
  localStorage.setItem('favourites', JSON.stringify(playlist.favourites))
}
</script>

<template>
  <div
    class="flex flex-col justify-end sm:flex-row w-screen h-screen sm:h-screen sm:px-0 bg-[#162750]"
    @keyup.right="trackSkipHandler"
    @keyup.left="trackSkipHandler(false)"
    @keyup.space="playerHandler"
    @keyup="onShuffleHandler"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    tabindex="-1"
  >
    <NavigationBar />
    <div
      class="container-gradient max-sm:grow order-1 sm:order-2 w-full sm:w-[94.6%] h-fit sm:h-full gap-[4%] sm:px-[5%] sm:py-0 py-[5%] flex flex-col sm:justify-center justify-end"
    >
      <ContentSection>
        <template v-slot:header>
          <div class="grid grid-cols-2 pb-3">
            <SectionHeader input-text-header="Your Style"/>
            <div class="col-span-1 flex justify-end gap-2">
              <!-- #NextButton&PreviousButton -->
              <PreviousPageHandler @click="previousPageHandler" />
              <NextPageHandler @click="nextPageHandler" />
            </div>
          </div>
        </template>
        <div
            class="grow relative h-fit overflow-x-auto scroll-smooth no-scrollbar-full"
            ref="playlistElement"
        >
          <div class="h-full inline-flex gap-10 justify-start">
            <div
                v-for="playlist in playlistData"
                :style="{
            backgroundImage: 'url(' + encodeURI(playlist.background) + ')',
          }"
                :key="playlist['playlistId']"
                :id="playlist['playlistId']"
                @click="$emit('click-playlist', $event.currentTarget.id)"
                class="flex justify-center w-[20rem] cursor-pointer bg-blue-500 rounded-2xl hover:bg-blue-400 bg-cover"
                tabindex="-1"
            >
              <p
                  class="text-white truncate text-lg font-semibold self-center text-center"
              >
                {{ playlist.name }}
              </p>
            </div>
          </div>
        </div>
      </ContentSection>
      <!-- #MusicPlayer&Trending -->
      <div
        class="h-fit sm:h-[62%] grid grid-rows-[60%-40%] max-sm:grow px-4 sm:px-0 sm:grid sm:grid-rows-1 grid-cols-1 sm:grid-cols-[20rem_1fr_1fr_1fr] gap-0 sm:gap-10"
      >
        <!-- #MusicPlayerCard #NowPlaying -->
        <ContentSection>
          <template v-slot:header>
            <SectionHeader input-text-header="Now Playing"/>
          </template>
          <MusicPlayerCard />
        </ContentSection>
        <!-- #TrendingSection -->
        <ContentSection>
          <template v-slot:header>
            <SectionHeader :input-text-header="playlist.selectedPlaylistName"/>
          </template>
          <div
              class="rounded-2xl no-scrollbar overflow-y-scroll scroll-smooth sm:pr-2 h-[12rem] sm:h-full"
          >
            <!-- #TrendingList -->
            <!-- for-loop here -->
            <div
                class="flex items-center mb-1 h-fit sm:h-16 bg-[#E5E5E5] hover:bg-[#D4D4D4] transition ease-in-out rounded-2xl overflow-clip cursor-pointer"
                v-for="(track, index) in playlist.selectedPlaylist"
                :key="track.trackId"
                :id="track.trackId"
                :class="{
                'is-playing': musicQueue.currentTrack.trackId === track.trackId,
              }"
                @mousedown="$event.preventDefault()"
                @click="onChooseTrackClick"
                ref="tracksElement"
            >
              <!-- #Ranking -->
              <div class="w-fit">
                <h1 class="text-center font-bold w-12">{{ index + 1 }}</h1>
              </div>
              <!-- #MusicCover -->
              <div class="h-full max-sm:w-24 aspect-square">
                <img
                    class="h-full aspect-square"
                    alt="Song Cover"
                    :src="track.cover"
                />
              </div>
              <!-- #Title&Artist -->
              <div
                  class="grow grid grid-rows-2 h-fit max-sm:w-full pl-3 sm:pl-5"
              >
                <h1 class="row-span-1 text-xl font-bold truncate">
                  {{ track.name }}
                </h1>
                <h1 class="row-span-1 font-semibold truncate" :id="index">
                  {{ track.artist }}
                </h1>
              </div>
              <Timer :time="track.duration" :size="5" :weight="2" />
              <!-- #LikeButton -->
              <div class="px-3 hidden sm:block">
                <button @click="onLikeHandler($event, track['trackId'])">
                  <LikeButton
                      fill="#c493e1"
                      stroke="#c493e1"
                      v-if="checkFavourite(track['trackId'])"
                  />
                  <LikeButton fill="none" stroke="black" v-else />
                </button>
              </div>
              <!-- #MenuButton -->
              <div class="px-3">
                <MenuButton />
              </div>
            </div>
          </div>
        </ContentSection>

      </div>
    </div>
  </div>
</template>

<style scoped>
.is-playing,
.is-playing:hover {
  background-color: #eedff6;
}

.container-gradient {
  background-image: linear-gradient(
    0deg,
    hsl(228deg 39% 29%) 0%,
    hsl(228deg 39% 32%) 33%,
    hsl(229deg 39% 34%) 47%,
    hsl(230deg 39% 37%) 58%,
    hsl(230deg 39% 40%) 67%,
    hsl(231deg 39% 43%) 74%,
    hsl(232deg 38% 46%) 81%,
    hsl(233deg 38% 49%) 87%,
    hsl(235deg 41% 53%) 93%,
    hsl(236deg 46% 56%) 100%
  );
}
</style>
