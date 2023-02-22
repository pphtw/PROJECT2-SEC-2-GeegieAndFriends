<script setup>
import {computed, onBeforeMount, reactive, ref} from 'vue'

// icons
import HomePageButton from '@/icon/NavigationBar/HomePageButton.vue'
import SearchPageButton from '@/icon/NavigationBar/SearchPageButton.vue'
import PlaylistPageButton from '@/icon/NavigationBar/PlaylistPageButton.vue'
import CreditPageButton from '@/icon/NavigationBar/CreditPageButton.vue'
import SettingPageButton from '@/icon/NavigationBar/SettingPageButton.vue'
import PreviousPageHandler from '@/icon/HomeContainer/previousPageHandler.vue'
import NextPageHandler from '@/icon/HomeContainer/NextPageHandler.vue'
import IsShuffled from '@/icon/HomeContainer/IsShuffled.vue'
import NoShuffled from '@/icon/HomeContainer/NoShuffled.vue'
import PreviousButton from '@/icon/HomeContainer/PreviousButton.vue'
import IsPlaying from '@/icon/HomeContainer/IsPlaying.vue'
import NoPlaying from '@/icon/HomeContainer/NoPlaying.vue'
import SkipButton from '@/icon/HomeContainer/SkipButton.vue'
import IsLooping from '@/icon/HomeContainer/NoLooping.vue'
import NoLooping from '@/icon/HomeContainer/IsLooping.vue'
import LikeButton from '@/icon/HomeContainer/LikeButton.vue'
import MenuButton from '@/icon/HomeContainer/MenuButton.vue'

import metadata from './assets/metadata.json'

const playlistData = metadata.playlists
const trackData = metadata.tracks

const musicQueue = reactive({
  currentPlaylistId: 1,
  currentTrack: computed(() => getTrack(musicQueue?.queue[0])),
  defaultQueue: [],
  queue: [],
  isShuffled: false,
  isLooping: false,
  isPlaying: false,
  toggleShuffle: (shuffle) => {
    const currentTrackId = musicQueue.queue[0]
    if (shuffle) {
      const restOfQueue = musicQueue.queue.filter((e, i) => i !== 0)
      for (let i = restOfQueue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = restOfQueue[i]
        restOfQueue[i] = restOfQueue[j]
        restOfQueue[j] = temp
      }
      musicQueue.queue = [currentTrackId, ...restOfQueue]
    } else {
      musicQueue.skipToTrack(currentTrackId, musicQueue.defaultQueue)
      musicQueue.queue = musicQueue.defaultQueue
    }
  },
  skipTrack: (toNext = true, queue = musicQueue.queue) => {
    if (toNext) {
      queue.push(queue.shift())
    } else {
      queue.unshift(queue.pop())
    }
  },
  skipToTrack: (id, queue = musicQueue.queue) => {
    const indexToSkip = queue.findIndex((trackId) => trackId === Number(id))
    if (Boolean(indexToSkip)) {
      if (indexToSkip < queue.length / 2) {
        while (queue[0] !== id) {
          musicQueue.skipTrack(true, queue)
        }
      } else {
        while (queue[0] !== id) {
          musicQueue.skipTrack(false, queue)
        }
      }
    }
  },
})
const progressBar = reactive({
  barWidth: '0%',
  isClicked: false,
  currentTime: '00:00',
  duration: '00:00',
  boundingRect: new DOMRect(),
  newTime: 0,
  updateProgressBar: () => {
    progressBar.barWidth =
      (audioElement.value.currentTime / audioElement.value.duration) * 100 + '%'
  },
  updateTime: (e) => {
    const x = progressBar.validateX(e.clientX)
    progressBar.newTime =
      (x / progressBar.boundingRect.width) * audioElement.value.duration
    progressBar.barWidth =
      (x / progressBar.boundingRect.width) * 100 + '%'
  },
  validateX: (x) => {
    // clientX is a property of the event object in JavaScript
    // progressBar.boundingRect.width = width of progress bar
    if (x < progressBar.boundingRect.left) {
      return 0
    } else if (x > progressBar.boundingRect.right) {
      return progressBar.boundingRect.width + 2
    } else {
      return x - progressBar.boundingRect.left
    }
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
})

// DOM Element
const audioElement = ref(null)
const tracksElement = ref(null)
const progressBarElement = ref(null)
const titleElement = ref(null)

// State
const isOverflow = ref(null)

// Event Handlers
const playerHandler = () => {
  console.log(playlist.selectedPlaylistId)
  if (audioElement.value.paused) {
    audioElement.value.play()
    musicQueue.isPlaying = true
  } else {
    audioElement.value.pause()
    musicQueue.isPlaying = false
  }
}
const trackSkipHandler = (toNext = true) => {
  musicQueue.skipTrack(toNext)
  toggleDelayedPlayPause()
}
const onLoadMetadataHandler = () => {
  progressBar.duration = secToMin(audioElement.value.duration)
  progressBar.currentTime = secToMin(audioElement.value.currentTime)
  progressBar.updateProgressBar()
  isOverflowed()
}
const onTimeUpdateHandler = () => {
  progressBar.currentTime = secToMin(audioElement.value.currentTime)
  if (!progressBar.isClicked) {
    progressBar.updateProgressBar()
  }
}
const onProgressBarMouseDown = (e) => {
  e.preventDefault()
  progressBar.isClicked = true
  progressBar.boundingRect = progressBarElement.value.getBoundingClientRect()
  progressBar.updateTime(e)
}
const onProgressBarMouseMove = (e) => {
  if (progressBar.isClicked) {
    progressBar.updateTime(e)
  }
}
const onProgressBarMouseUp = (e) => {
  if (progressBar.isClicked) {
    progressBar.updateTime(e)
    audioElement.value.currentTime = progressBar.newTime
    progressBar.isClicked = false
  }
}
const onChooseTrackMouseDown = (e) => {
  e.preventDefault()
}
const onChooseTrackClick = (e) => {
  if (!progressBar.isClicked) {
    const chooseTrackId = Number(e.currentTarget.id)
    if (musicQueue.currentPlaylistId !== playlist.selectedPlaylistId) {
      musicQueue.currentPlaylistId = playlist.selectedPlaylistId
      musicQueue.queue = [...getTrackList(musicQueue.currentPlaylistId)]
      musicQueue.defaultQueue = musicQueue.queue
    }
    musicQueue.skipToTrack(chooseTrackId)
    toggleDelayedPlayPause(300)
    audioElement.value.play()
    musicQueue.isPlaying = true

  }
}
const onChoosePlaylist = (e) => {
  playlist.selectedPlaylistId = Number(e.currentTarget.id)
}
const onShuffleHandler = (e) => {
  if (e.code === 'KeyS' || e.button === 0) {
    if (musicQueue.defaultQueue.length === 0) {
      musicQueue.defaultQueue = musicQueue.queue
    }
    if (!musicQueue.isShuffled) {
      musicQueue.toggleShuffle(true)
      musicQueue.isShuffled = true
    } else {
      musicQueue.toggleShuffle(false)
      musicQueue.isShuffled = false
    }
  }
}
const onLoopHandler = (e) => {
  console.log('Create Loop Handler Here')
  console.log(e)
}

// Utils
const toggleDelayedPlayPause = (delay = 0) => {
  setTimeout(() => {
    if (musicQueue.isPlaying) {
      audioElement.value.play()
    } else {
      audioElement.value.pause()
    }
  }, delay)
}
const secToMin = (timeInSec) => {
  return new Date(timeInSec * 1000).toISOString().substring(14, 19)
}
const isOverflowed = () => {
  const element = titleElement.value
  isOverflow.value = false
  setTimeout(() => {
    isOverflow.value =
      element.scrollHeight > element.offsetHeight ||
      element.scrollWidth > element.offsetWidth
  }, 100)
}

// Getters
const getTrack = (trackId = 1) => {
  return trackData.find((track) => track['trackId'] === trackId)
}
const getTrackList = (playlistId) => {
  return [
    ...playlistData.find(
      (playlist) => playlist['playlistId'] === Number(playlistId)
    ).tracks,
  ]
}
const getPlaylist = (playlistId) => {
  return playlistData.find((playlist) => playlist['playlistId'] === playlistId)
}

// Hooks
onBeforeMount(() => {
  musicQueue.queue = [...getTrackList(1)]
  // console.log(getTrackList(2))
  // console.log(musicQueue.queue);
})
// Playlist Scroll
const playlistElement = ref(null)
const nextPageHandler = () => {
  playlistElement.value.scrollLeft += 1400
}
const previousPageHandler = () => {
  playlistElement.value.scrollLeft -= 1400
}

//Favorite
const onLikeHandler = (e, trackId) => {
  e.stopPropagation()
  let track = getTrack(trackId)
  track.favourited = !track.favourited
}
</script>

<template>
  <div
    class="flex flex-col justify-end sm:flex-row w-screen h-screen sm:h-screen sm:px-0 bg-[#2D3967]"
    @keyup.right="trackSkipHandler"
    @keyup.left="trackSkipHandler(false)"
    @keyup.space="playerHandler"
    @keyup="onShuffleHandler"
    @mousemove="onProgressBarMouseMove"
    @mouseup="onProgressBarMouseUp"
    tabindex="-1"
  >
    <!-- #NavigationBar -->
    <div
      class="flex flex-row order-2 sm:order-1 sm:flex-col justify-center row-span-6 gap-5 items-center w-full sm:w-[5.4%] py-3 sm:py-0 h-fit sm:h-full max-sm:z-10 bg-[#162750]"
    >
      <!-- #HomePageButton -->
      <HomePageButton />
      <!-- #SearchPageButton -->
      <SearchPageButton />
      <!-- #PlaylistPageButton -->
      <PlaylistPageButton />
      <!-- #CreditPageButton -->
      <CreditPageButton />
      <!-- #SettingPageButton -->
      <SettingPageButton />
    </div>
    <!-- #HomeContainer -->
    <div
      class="max-sm:grow order-1 sm:order-2 w-full sm:w-[94.6%] h-fit sm:h-full gap-[4%] sm:px-[5%] sm:py-0 py-[5%] flex flex-col sm:justify-center justify-end"
    >
      <!-- #Header&Playlist -->
      <div class="h-fit sm:h-[28%] flex-col hidden sm:flex">
        <!-- #Header -->
        <div class="grid grid-cols-2 pb-3">
          <h1 class="text-2xl font-bold text-white col-start-1">Your Style</h1>
          <div class="col-span-1 flex justify-end gap-2">
            <!-- #NextButton&PreviousButton -->
            <PreviousPageHandler @click="previousPageHandler" />
            <NextPageHandler @click="nextPageHandler" />
          </div>
        </div>
        <!-- #Playlist -->
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
              @click="onChoosePlaylist"
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
      </div>
      <!-- #MusicPlayer&Trending -->
      <div
        class="h-fit sm:h-[62%] grid grid-rows-[60%-40%] max-sm:grow px-4 sm:px-0 sm:grid sm:grid-rows-1 grid-cols-1 sm:grid-cols-[20rem_1fr_1fr_1fr] gap-0 sm:gap-10"
      >
        <!-- #MusicPlayerCard #NowPlaying -->
        <div
          class="col-span-1 row-span-1 max-sm:w-full sm:row-auto sm:flex sm:flex-col sm:justify-start sm:h-full max-sm:place-self-center"
        >
          <h1 class="text-2xl font-bold pb-3 max-sm:hidden text-white truncate">
            Now Playing
          </h1>
          <div class="flex flex-col rounded-2xl bg-white h-fit sm:h-full">
            <!-- #MusicCover -->
            <div
              class="h-fit sm:h-full bg-cover bg-center rounded-t-2xl aspect-square sm:aspect-auto"
              :style="{
                backgroundImage:
                  'url(' + encodeURI(musicQueue.currentTrack.cover) + ')',
              }"
            ></div>
            <!-- #ProgressBar -->
            <div class="overflow-clip">
              <audio
                ref="audioElement"
                :src="musicQueue.currentTrack.source"
                @timeupdate="onTimeUpdateHandler"
                @loadedmetadata="onLoadMetadataHandler"
                @ended="trackSkipHandler"
              ></audio>
              <div
                class="progress-bar self-center active:cursor-default"
                ref="progressBarElement"
                @mousedown="onProgressBarMouseDown"
              >
                <div
                  class="progress-current"
                  :style="{ width: progressBar.barWidth }"
                ></div>
              </div>
            </div>
            <!-- #CurrentTime&Duration -->
            <div>
              <div class="flex justify-between w-full items-center">
                <p class="px-2 text-sm">{{ progressBar.currentTime }}</p>
                <p class="px-2 text-sm">{{ progressBar.duration }}</p>
              </div>
            </div>
            <!-- #MusicTitle&Controller -->
            <div
              class="flex flex-col gap-1 justify-around items-center h-fit bg-white rounded-b-2xl"
            >
              <!-- #MusicTitle&Artist -->
              <div
                class="relative text-center h-8 w-[80%] overflow-x-hidden"
                ref="titleElement">
                <div
                  :class="isOverflow ? 'animate-marquee whitespace-nowrap' : ''">
                  <h1 class="text-2xl font-bold">
                    {{ musicQueue.currentTrack.name }}
                  </h1>
                </div>
                <div
                  :class="
                    isOverflow
                      ? 'absolute top-0 animate-marquee2 whitespace-nowrap visible'
                      : 'hidden'
                  "
                >
                  <h1 class="text-2xl font-bold">
                    {{ musicQueue.currentTrack.name }}
                  </h1>
                </div>
              </div>
              <div class="text-center h-fit w-[70%]">
                <h3 class="font-semibold w-full">
                  {{ musicQueue.currentTrack.artist }}
                </h3>
              </div>

              <!-- #Controller -->
              <div
                class="flex justify-center basis-16 items-center gap-5 h-fit w-full sm:overflow-hidden max-sm:gap-4 2xl:gap-6"
              >
                <!-- #ShuffleButton -->
                <div class="random-track">
                  <button @click="onShuffleHandler">
                    <IsShuffled v-if="musicQueue.isShuffled" />
                    <NoShuffled v-else />
                  </button>
                </div>
                <!-- #PreviousButton -->
                <div class="prev-track" @click="trackSkipHandler(false)">
                  <button>
                    <PreviousButton />
                  </button>
                </div>
                <!-- #PlayButton/PauseButton -->
                <div>
                  <button class="[clip-path:circle()]" @click="playerHandler">
                    <IsPlaying v-if="musicQueue.isPlaying" />
                    <NoPlaying v-else />
                  </button>
                </div>
                <!-- #SkipButton -->
                <div class="next-track" @click="trackSkipHandler">
                  <button>
                    <SkipButton />
                  </button>
                </div>
                <!-- #LoopButton -->
                <div class="repeat-track">
                  <button @click="onLoopHandler">
                    <NoLooping v-if="musicQueue.isLooping" />
                    <IsLooping v-else />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- #TrendingSection -->
        <div class="row-span-1 col-span-1 sm:col-span-3 sm:row-auto flex flex-col justify-start h-fit sm:h-full max-sm:place-self-center">
          <h1 class="text-2xl font-bold pb-3 max-sm:text-center text-white truncate">
            {{ playlist.selectedPlaylistName }}
          </h1>
          <div class="rounded-2xl no-scrollbar overflow-y-scroll scroll-smooth sm:pr-2 h-[12rem] sm:h-full">
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
              @mousedown="onChooseTrackMouseDown"
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
              <!-- #Duration -->
              <div class="px-3 font-semibold hidden sm:block">
                {{ track.duration }}
              </div>
              <!-- #LikeButton -->
              <div class="px-3 hidden sm:block">
                <button @click="onLikeHandler($event, track.trackId)">
                  <LikeButton
                    fill="#c493e1"
                    stroke="#c493e1"
                    v-if="track.favourited"
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
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.progress-bar {
  height: 0.4em;
  width: 100%;
  top: -2em;
  bottom: -2em;
  cursor: pointer;
  background-color: #b9b9b9;
}

.progress-current {
  height: inherit;
  width: 0;
  background-color: #c493e1;
  border-radius: 0 2em 2em 0;
}

.is-playing {
  background: #eedff6;
}
</style>
