<script setup>
import { onBeforeMount, ref } from 'vue'
import {getTrackList} from "@/utils/storage";

// icons
import HomePageButton from '@/components/icon/NavigationBar/HomePageButton.vue'
import SearchPageButton from '@/components/icon/NavigationBar/SearchPageButton.vue'
import PlaylistPageButton from '@/components/icon/NavigationBar/PlaylistPageButton.vue'
import CreditPageButton from '@/components/icon/NavigationBar/CreditPageButton.vue'
import SettingPageButton from '@/components/icon/NavigationBar/SettingPageButton.vue'
import PreviousPageHandler from '@/components/icon/HomeContainer/previousPageHandler.vue'
import NextPageHandler from '@/components/icon/HomeContainer/NextPageHandler.vue'
import IsShuffled from '@/components/icon/HomeContainer/IsShuffled.vue'
import NoShuffled from '@/components/icon/HomeContainer/NoShuffled.vue'
import PreviousButton from '@/components/icon/HomeContainer/PreviousButton.vue'
import IsPlaying from '@/components/icon/HomeContainer/IsPlaying.vue'
import NoPlaying from '@/components/icon/HomeContainer/NoPlaying.vue'
import SkipButton from '@/components/icon/HomeContainer/SkipButton.vue'
import IsLooping from '@/components/icon/HomeContainer/NoLooping.vue'
import NoLooping from '@/components/icon/HomeContainer/IsLooping.vue'
import LikeButton from '@/components/icon/HomeContainer/LikeButton.vue'
import MenuButton from '@/components/icon/HomeContainer/MenuButton.vue'
import {musicQueue} from "@/utils/util";
import {progressBar,audioElement} from "@/utils/util";
import {playlist} from "@/utils/util";
import {secToMin} from "@/utils/util";
import {playerHandler} from "@/utils/eventhandlers";
import {toggleDelayedPlayPause} from "@/utils/util";
import {trackSkipHandler} from "@/utils/eventhandlers";
import {onLoadMetadataHandler} from "@/utils/util";
import {isOverflow,titleElement} from "@/utils/util";
import metadata from './assets/metadata.json'
const playlistData = metadata.playlists


// DOM Element
const tracksElement = ref(null)
const progressBarElement = ref(null)

// State


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
      if (musicQueue.isShuffled) {
        musicQueue.toggleShuffle(true)
      }
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


// Hooks
onBeforeMount(() => {
  musicQueue.queue = [...getTrackList(1)]
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
import {onLikeHandler} from "@/utils/storage";
import {checkFavourite} from "@/utils/storage";

</script>
<template>
  <audio
      ref="audioElement"
      :src="musicQueue.currentTrack.source"
      @timeupdate="onTimeUpdateHandler"
      @loadedmetadata="onLoadMetadataHandler"
      @ended="trackSkipHandler"
  ></audio>
  <div
    class="flex flex-col justify-end sm:flex-row w-screen h-screen sm:h-screen sm:px-0 bg-[#162750]"
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
      class="container-gradient max-sm:grow order-1 sm:order-2 w-full sm:w-[94.6%] h-fit sm:h-full gap-[4%] sm:px-[5%] sm:py-0 py-[5%] flex flex-col sm:justify-center justify-end"
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
                ref="titleElement"
              >
                <div
                  :class="isOverflow ? 'animate-marquee whitespace-nowrap' : ''"
                >
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
        <div
          class="row-span-1 col-span-1 sm:col-span-3 sm:row-auto flex flex-col justify-start h-fit sm:h-full max-sm:place-self-center"
        >
          <h1
            class="text-2xl font-bold pb-3 max-sm:text-center text-white truncate"
          >
            {{ playlist.selectedPlaylistName }}
          </h1>
          <div
            class="rounded-2xl no-scrollbar overflow-y-scroll scroll-smooth sm:pr-2 h-[12rem] sm:h-full"
          >
            <!-- #TrendingList -->
            <!-- for-loop here -->
            <div
              class=" flex items-center mb-1 h-fit sm:h-16 bg-[#E5E5E5] hover:bg-[#D4D4D4] transition ease-in-out rounded-2xl overflow-clip cursor-pointer"
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
