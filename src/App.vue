<script setup>
import { computed, onBeforeMount, onMounted, reactive, ref } from 'vue'
import metadata from '@/assets/metadata.json'

const tracks = metadata.tracks

const musicQueue = reactive({
  defaultQueue: [],
  queue: [],
  isShuffled: false,
  isLooping: false,
})

// DOM Element
const audioElement = ref(null)
const tracksElement = ref(null)
const progressBarElement = ref(null)
const trendingElement = ref(null)
const titleElement = ref(null)

const repeat = ref(false)
const currentTime = ref('00:00')
const duration = ref('00:00')
const isPlaying = ref(false)
const barWidth = ref('0%')
const isProgressBarClicked = ref(false)

// isOverflow
const isOverflow = ref(null)

const currentTrack = computed(() => findTrack(musicQueue?.queue[0]))

// Event Handlers
const playerHandler = () => {
  if (audioElement.value.paused) {
    audioElement.value.play()
    isPlaying.value = true
  } else {
    audioElement.value.pause()
    isPlaying.value = false
  }
}
const onNextHandler = () => {
  skipTrack()
  toggleDelayedPlayPause(300)
}
const onPreviousHandler = () => {
  skipTrack(false)
  toggleDelayedPlayPause(300)
}
const onEndedHandler = () => {
  onNextHandler()
  isPlaying.value = true
}
const onLoadMetadataHandler = () => {
  duration.value = msToMin(audioElement.value.duration)
  currentTime.value = msToMin(audioElement.value.currentTime)
  updateProgressBar()
  isOverflowed()
}
const onTimeUpdateHandler = () => {
  currentTime.value = msToMin(audioElement.value.currentTime)
  if (!isProgressBarClicked.value) {
    updateProgressBar()
  }
}
const onProgressBarMouseDown = (e) => {
  // getBoundingClientRect = object that represents the layout of an element in the viewport.
  const boundingRect = progressBarElement.value.getBoundingClientRect()
  isProgressBarClicked.value = true
  // update time current
  let newTime
  const toValidX = (x) => {
    // clientX is a property of the event object in JavaScript
    // boundingRect.width = width of progress bar
    if (x < boundingRect.left) {
      return 0
    } else if (x > boundingRect.right) {
      return boundingRect.width + 2
    } else {
      return x - boundingRect.left
    }
  }
  const updateTime = (e) => {
    const x = toValidX(e.clientX)
    newTime = (x / boundingRect.width) * audioElement.value.duration
    barWidth.value = (toValidX(e.clientX) / boundingRect.width) * 100 + '%'
  }
  e.preventDefault()
  barWidth.value = (toValidX(e.clientX) / boundingRect.width) * 100 + '%'
  updateTime(e)
  window.addEventListener('mousemove', updateTime)
  window.addEventListener(
    'mouseup',
    () => {
      window.removeEventListener('mousemove', updateTime)
      audioElement.value.currentTime = newTime
      isProgressBarClicked.value = false
    },
    { once: true }
  )
}
const onMouseDownChooseTrackHandler = (e) => {
  e.preventDefault()
}
const onMouseUpChooseTrackHandler = (e) => {
  const chooseTrackId = Number(e.currentTarget.id)
  skipToTrack(chooseTrackId)
  setBackgroundOnChange()
  toggleDelayedPlayPause(300)
}
// const onClickPlaylist = () => {
// const playListNode = e.currentTarget
// console.log(trending.childNodes[1])
// }

const onShuffleHandler = (e) => {
  if (e.code === 'KeyS' || e.button === 0) {
    if (musicQueue.defaultQueue.length === 0) {
      musicQueue.defaultQueue = musicQueue.queue
    }
    if (!musicQueue.isShuffled) {
      toggleShuffle(true)
      musicQueue.isShuffled = true
    } else {
      toggleShuffle(false)
      musicQueue.isShuffled = false
    }
  }
}

// Utils
const toggleDelayedPlayPause = (delay = 0) => {
  setTimeout(() => {
    if (isPlaying.value) {
      audioElement.value.play()
    } else {
      audioElement.value.pause()
    }
  }, delay)
}
const msToMin = (timeInMs) => {
  return new Date(timeInMs * 1000).toISOString().substring(14, 19)
}
const updateProgressBar = () => {
  barWidth.value =
    (audioElement.value.currentTime / audioElement.value.duration) * 100 + '%'
}
const setBackgroundOnChange = () => {
  const trackParent = tracksElement.value
  trackParent.forEach((trackNode) => {
    trackNode.style = 'background : white'
  })
  const currentTrackIndex = tracks.findIndex(
    (e) => e['trackId'] === currentTrack.value.trackId
  )
  trackParent[currentTrackIndex].style = 'background : #dcbfed'
  trackParent[currentTrackIndex].scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  })
}
const isOverflowed = () => {
  const element = titleElement.value
  isOverflow.value = false
  setTimeout(() => {
    isOverflow.value = element.scrollHeight > element.offsetHeight
  }, 100)
}
const skipTrack = (toNext = true, queue = musicQueue.queue) => {
  if (toNext) {
    queue.push(queue.shift())
  } else {
    queue.unshift(queue.pop())
  }
}
const findTrack = (trackId = 1) => {
  return tracks.find((track) => track['trackId'] === trackId)
}
const findPlaylist = (playlistName) => {
  return metadata.playlist.find((playlist) => playlist['name'] === playlistName)
    .tracks
}
const skipToTrack = (id, queue = musicQueue.queue) => {
  const indexToSkip = queue.findIndex((trackId) => trackId === id)
  if (Boolean(indexToSkip)) {
    if (indexToSkip > queue.length / 2) {
      while (queue[0] !== id) {
        skipTrack(true, queue)
      }
    } else {
      while (queue[0] !== id) {
        skipTrack(false, queue)
      }
    }
  }
}
const toggleShuffle = (shuffle) => {
  const currentTrackId = musicQueue.queue[0]
  if (shuffle) {
    console.log(musicQueue.queue)
    const restOfQueue = musicQueue.queue.filter((e, i) => i !== 0)
    for (let i = restOfQueue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = restOfQueue[i]
      restOfQueue[i] = restOfQueue[j]
      restOfQueue[j] = temp
    }
    musicQueue.queue = [currentTrackId, ...restOfQueue]
  } else {
    skipToTrack(currentTrackId, musicQueue.defaultQueue)
    musicQueue.queue = musicQueue.defaultQueue
  }
}

// Carousel playlist

const playlist = ref(metadata.playlist)
const idx = ref(0)
const playListIdx = ref(playlist.value[idx.value])

const nextGroup = () => {
  idx.value++
  if (idx.value === playlist.value.length) {
    playListIdx.value = playlist.value[0]
    idx.value = 0
  } else {
    playListIdx.value = playlist.value[idx.value]
  }
}
const prevGroup = () => {
  if (idx.value === 0) {
    const last = playlist.value.length - 1
    playListIdx.value = playlist.value[last]
    idx.value = last
  } else {
    idx.value--
    playListIdx.value = playlist.value[idx.value]
  }
}

// const extractDuration = (track) => {
//   const audio = new Audio(track.source)
//   audio.addEventListener('loadedmetadata', function () {
//     track.duration = msToMin(audio.duration)
//   })
// }

// Hooks
onBeforeMount(() => {
  musicQueue.queue = findPlaylist('Trending')
})

onMounted(() => {
  audioElement.value.volume = 0.07
})
</script>

<template>
  <div
    class="flex flex-col justify-end sm:flex-row w-screen h-screen sm:h-screen sm:px-0 bg-[#2D3967]"
    @keyup.right="onNextHandler"
    @keyup.left="onPreviousHandler"
    @keyup.space="playerHandler"
    @keyup="onShuffleHandler"
    tabindex="-1"
  >
    <!-- #NavigationBar -->
    <div
      class="flex flex-row order-2 sm:order-1 sm:flex-col justify-center row-span-6 gap-5 items-center w-full py-3 sm:py-0 sm:w-[5.4%] h-fit sm:h-full max-sm:fixed bg-[#162750]"
    >
      <!-- #HomePageButton -->
      <svg
        class="hover:scale-125 transition ease-in-out"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 17.99V14.99M9.02 2.83998L3.63 7.03998C2.73 7.73998 2 9.22998 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.28998 21.19 7.73998 20.2 7.04998L14.02 2.71998C12.62 1.73998 10.37 1.78998 9.02 2.83998Z"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <!-- #SearchPageButton -->
      <svg
        class="hover:scale-125 transition ease-in-out"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 5H20M14 8H17M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2M22 22L20 20"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <!-- #PlaylistPageButton -->
      <svg
        class="hover:scale-125 transition ease-in-out"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 13V17C22 20.5 20 22 17 22H7C4 22 2 20.5 2 17V13C2 10.35 3.15 8.85 5 8.28C5.6 8.09 6.27 8 7 8H17C17.73 8 18.4 8.09 19 8.28C20.85 8.85 22 10.35 22 13Z"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19 7V8.28C18.4 8.09 17.73 8 17 8H7C6.27 8 5.6 8.09 5 8.28V7C5 5.9 5.9 5 7 5H17C18.1 5 19 5.9 19 7ZM16 3.51V5H8V3.51C8 2.68 8.68 2 9.51 2H14.49C15.32 2 16 2.68 16 3.51Z"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.07 19.4501C9.42009 19.4501 9.75583 19.311 10.0034 19.0634C10.2509 18.8159 10.39 18.4801 10.39 18.1301C10.39 17.78 10.2509 17.4442 10.0034 17.1967C9.75583 16.9491 9.42009 16.8101 9.07 16.8101C8.71991 16.8101 8.38417 16.9491 8.13662 17.1967C7.88907 17.4442 7.75 17.78 7.75 18.1301C7.75 18.4801 7.88907 18.8159 8.13662 19.0634C8.38417 19.311 8.71991 19.4501 9.07 19.4501Z"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.25 17.25V12.08C15.25 10.98 14.56 10.82 13.86 11.02L11.21 11.74C10.73 11.87 10.4 12.25 10.4 12.8V18.13"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.4 14.35L15.25 13.03M13.93 18.57C14.2801 18.57 14.6159 18.431 14.8634 18.1834C15.111 17.9359 15.25 17.6001 15.25 17.25C15.25 16.8999 15.111 16.5642 14.8634 16.3166C14.6159 16.0691 14.2801 15.93 13.93 15.93C13.5799 15.93 13.2442 16.0691 12.9966 16.3166C12.7491 16.5642 12.61 16.8999 12.61 17.25C12.61 17.6001 12.7491 17.9359 12.9966 18.1834C13.2442 18.431 13.5799 18.57 13.93 18.57Z"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <!-- #CreditPageButton -->
      <svg
        class="hover:scale-125 transition ease-in-out"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22Z"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.88 15C14.1508 15.6431 13.2123 15.9986 12.24 16C10.03 16 8.23999 14.21 8.23999 12C8.23999 9.79 10.03 8 12.24 8C13.2123 8.0014 14.1508 8.35689 14.88 9"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <!-- #SettingPageButton -->
      <svg
        class="hover:scale-125 transition ease-in-out"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15Z"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2 12.8801V11.1201C2 10.0801 2.85 9.22006 3.9 9.22006C5.71 9.22006 6.45 7.94006 5.54 6.37006C5.02 5.47006 5.33 4.30006 6.24 3.78006L7.97 2.79006C8.76 2.32006 9.78 2.60006 10.25 3.39006L10.36 3.58006C11.26 5.15006 12.74 5.15006 13.65 3.58006L13.76 3.39006C14.23 2.60006 15.25 2.32006 16.04 2.79006L17.77 3.78006C18.68 4.30006 18.99 5.47006 18.47 6.37006C17.56 7.94006 18.3 9.22006 20.11 9.22006C21.15 9.22006 22.01 10.0701 22.01 11.1201V12.8801C22.01 13.9201 21.16 14.7801 20.11 14.7801C18.3 14.7801 17.56 16.0601 18.47 17.6301C18.99 18.5401 18.68 19.7001 17.77 20.2201L16.04 21.2101C15.25 21.6801 14.23 21.4001 13.76 20.6101L13.65 20.4201C12.75 18.8501 11.27 18.8501 10.36 20.4201L10.25 20.6101C9.78 21.4001 8.76 21.6801 7.97 21.2101L6.24 20.2201C5.8041 19.9691 5.48558 19.5554 5.35435 19.0698C5.22311 18.5843 5.28988 18.0665 5.54 17.6301C6.45 16.0601 5.71 14.7801 3.9 14.7801C2.85 14.7801 2 13.9201 2 12.8801Z"
          stroke="#E5E5E5"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <!-- #HomeContainer -->
    <div
      class="max-sm:grow order-1 sm:order-2 w-full h-fit sm:h-full gap-[4%] p-0 sm:px-28 py-[1%] flex flex-col sm:justify-center justify-end"
    >
      <!-- #Header&Playlist -->
      <div class="h-fit flex-col hidden sm:flex">
        <!-- #Header -->
        <div class="grid grid-cols-2 pb-3">
          <h1 class="text-2xl font-bold text-white col-start-1">Your Style</h1>
          <div class="col-span-1 flex justify-end gap-2">
            <!-- #NextButton&PreviousButton -->
            <svg
              @click="prevGroup"
              class="hover:scale-110 transition ease-in-out"
              width="40"
              height="40"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="50" height="50" rx="25" fill="#E5E5E5" />
              <path
                d="M26.8602 34.5684L26.8598 34.5682L22.4213 32.1664L17.9834 29.7649C17.9832 29.7648 17.9831 29.7647 17.9829 29.7646C15.3604 28.343 14.25 26.5822 14.25 25C14.25 23.4177 15.3605 21.6568 17.9834 20.2351L22.4213 17.8336L26.8598 15.4318L26.8602 15.4316C29.4753 14.0141 31.6932 13.9673 33.2066 14.7887C34.7043 15.6016 35.75 17.3961 35.75 20.1964V25V29.8036C35.75 32.6039 34.7043 34.3984 33.2066 35.2113C31.6932 36.0327 29.4753 35.9859 26.8602 34.5684Z"
                stroke="black"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              @click="nextGroup"
              class="hover:scale-110 transition ease-in-out"
              width="40"
              height="40"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="50" height="50" rx="25" fill="#E5E5E5" />
              <path
                d="M23.1398 15.4316L23.1402 15.4318L27.5787 17.8336L32.0166 20.2351C32.0168 20.2352 32.0169 20.2353 32.0171 20.2354C34.6396 21.657 35.75 23.4178 35.75 25C35.75 26.5823 34.6395 28.3432 32.0166 29.7649L27.5787 32.1664L23.1402 34.5682L23.1398 34.5684C20.5247 35.9859 18.3068 36.0327 16.7934 35.2113C15.2957 34.3984 14.25 32.6039 14.25 29.8036V25V20.1964C14.25 17.3961 15.2957 15.6016 16.7934 14.7887C18.3068 13.9673 20.5247 14.0141 23.1398 15.4316Z"
                stroke="black"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <!-- #Playlist -->
        <div
          class="h-40 grid grid-cols-4 gap-[2.8%] text-center ease-linear duration-75"
        >
          <div
            v-for="(playlist, index) in playListIdx"
            :style="{
              backgroundImage: 'url(' + encodeURI(playlist.background) + ')',
            }"
            :key="index"
            :id="index"
            @click="onClickPlaylist"
            class="flex flex-col justify-center col-span-1 bg-blue-500 rounded-2xl hover:bg-blue-400 transition ease-in-out duration-200 bg-cover"
          >
            <p class="text-white text-lg font-semibold">{{ playlist.name }}</p>
          </div>
        </div>
      </div>
      <!-- #MusicPlayer&Trending -->
      <div
        class="h-fit sm:h-[62%] grid grid-rows-[60%-40%] max-sm:grow px-4 sm:px-0 sm:grid sm:grid-rows-1 grid-cols-1 sm:grid-cols-4 gap-0 sm:gap-[2.8%]"
      >
        <!-- #MusicPlayerCard #NowPlaying -->
        <div
          class="col-span-1 row-span-1 max-sm:w-[80%] sm:row-auto sm:flex sm:flex-col sm:justify-start sm:h-full max-sm:place-self-center"
        >
          <h1
            class="text-2xl font-bold pb-3 max-sm:text-center text-white truncate"
          >
            Now Playing
          </h1>
          <div class="flex flex-col rounded-2xl bg-white h-fit sm:h-full">
            <!-- #MusicCover -->
            <div
              class="h-fit sm:h-[70%] bg-cover bg-center rounded-t-2xl aspect-square sm:aspect-auto"
              :style="{
                backgroundImage: 'url(' + encodeURI(currentTrack.cover) + ')',
              }"
            ></div>
            <!-- #ProgressBar -->
            <div class="overflow-clip">
              <audio
                ref="audioElement"
                :src="currentTrack.source"
                @timeupdate="onTimeUpdateHandler"
                @loadedmetadata="onLoadMetadataHandler"
                @ended="onEndedHandler"
                @playing="setBackgroundOnChange"
              ></audio>
              <div
                class="progress-bar self-center active:cursor-default"
                ref="progressBarElement"
                @mousedown="onProgressBarMouseDown"
              >
                <div
                  class="progress-current"
                  :style="{ width: barWidth }"
                ></div>
              </div>
            </div>
            <!-- #CurrentTime&Duration -->
            <div>
              <div class="flex justify-between w-full items-center">
                <p class="px-2 text-sm">{{ currentTime }}</p>
                <p class="px-2 text-sm">{{ duration }}</p>
              </div>
            </div>
            <!-- #MusicTitle&Controller -->
            <div
              class="flex flex-col gap-3 justify-around items-center h-fit bg-white rounded-b-2xl"
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
                    {{ currentTrack.name }}
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
                    {{ currentTrack.name }}
                  </h1>
                </div>
              </div>
              <div class="text-center h-fit w-[70%]">
                <h3 class="font-semibold w-full">
                  {{ currentTrack.artist }}
                </h3>
              </div>

              <!-- #Controller -->
              <div
                class="flex justify-center basis-16 items-center gap-5 h-fit w-full sm:overflow-hidden max-sm:gap-4 2xl:gap-6"
              >
                <!-- #ShuffleButton -->
                <div class="random-track">
                  <button @click="onShuffleHandler">
                    <svg
                      v-if="musicQueue.isShuffled"
                      width="30"
                      height="30"
                      viewBox="0 0 27 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 20.4733L4.4 20.4867C5.61333 20.4867 6.74667 19.8867 7.41333 18.8867L15.9333 6.11332C16.2632 5.61738 16.7115 5.21142 17.2376 4.93208C17.7637 4.65274 18.351 4.50882 18.9467 4.51332L25.0133 4.53999M22.3333 23.14L25 20.4733M8.85333 7.99332L7.41333 5.99332C7.08029 5.5271 6.63983 5.14798 6.12924 4.88803C5.61864 4.62809 5.05293 4.49499 4.48 4.49999L1 4.51332M14.2933 17.0067L15.92 19.1C16.6 19.98 17.6667 20.5 18.7867 20.5L25.0133 20.4733M25 4.52665L22.3333 1.85999"
                        stroke="#C493E1"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <svg
                      v-else
                      width="30"
                      height="30"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 23.9733L7.4 23.9867C8.61333 23.9867 9.74667 23.3867 10.4133 22.3867L18.9333 9.61332C19.2632 9.11738 19.7115 8.71142 20.2376 8.43208C20.7637 8.15274 21.351 8.00882 21.9467 8.01332L28.0133 8.03999M25.3333 26.64L28 23.9733M11.8533 11.4933L10.4133 9.49332C10.0803 9.0271 9.63983 8.64798 9.12924 8.38803C8.61864 8.12809 8.05293 7.99499 7.48 7.99999L4 8.01332M17.2933 20.5067L18.92 22.6C19.6 23.48 20.6667 24 21.7867 24L28.0133 23.9733M28 8.02665L25.3333 5.35999"
                        stroke="black"
                        stroke-opacity="0.7"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <!-- #PreviousButton -->
                <div class="prev-track" @click="onPreviousHandler">
                  <button>
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.01336 7.77156L5.01336 24.2516M26.9867 22.3849L26.9867 9.62489C26.9867 7.01156 24.1467 5.37156 21.88 6.67823L16.3467 9.86489L10.8134 13.0649C8.54669 14.3716 8.54669 17.6382 10.8134 18.9449L16.3467 22.1449L21.88 25.3316C24.1467 26.6382 26.9867 25.0116 26.9867 22.3849Z"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <!-- #PlayButton/PauseButton -->
                <div>
                  <button class="[clip-path:circle()]" @click="playerHandler">
                    <svg
                      v-if="isPlaying"
                      width="40"
                      height="40"
                      viewBox="0 0 50 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="50" height="50" rx="25" fill="#C493E1" />
                      <path
                        d="M19.3041 33.2143C19.3041 33.4257 19.3085 33.6363 19.3128 33.8377L19.3129 33.8444C19.3172 34.0453 19.3212 34.2365 19.3212 34.4207C19.3212 34.798 19.3036 35.1123 19.2474 35.3647C19.1918 35.6148 19.1085 35.7574 19.0126 35.8413C18.9226 35.92 18.7611 36 18.4348 36C18.0271 36 17.8017 35.9123 17.6703 35.8154C17.5421 35.7207 17.4456 35.5746 17.3796 35.3386C17.3114 35.0947 17.2852 34.7879 17.2804 34.4143C17.2776 34.1967 17.2813 33.9929 17.2853 33.7784C17.2886 33.6022 17.292 33.4188 17.292 33.2143L17.292 16.7857C17.292 16.5813 17.2886 16.3978 17.2853 16.2217C17.2813 16.0071 17.2776 15.8034 17.2804 15.5857C17.2852 15.2121 17.3114 14.9053 17.3796 14.6614C17.4456 14.4254 17.5421 14.2793 17.6704 14.1846C17.8017 14.0877 18.0271 14 18.4348 14C18.8463 14 19.0396 14.0891 19.1353 14.168C19.227 14.2438 19.3012 14.3697 19.3417 14.6099C19.3835 14.8578 19.3798 15.1675 19.3591 15.5525C19.3543 15.6423 19.3485 15.7365 19.3426 15.8339C19.3242 16.1333 19.3041 16.4623 19.3041 16.7857V33.2143ZM30.7084 33.2143V16.7857C30.7084 16.5205 30.6972 16.2404 30.6868 15.9802C30.681 15.834 30.6754 15.6941 30.6722 15.5667C30.6627 15.1866 30.6718 14.8782 30.725 14.6324C30.7763 14.3946 30.8593 14.2598 30.9666 14.1756C31.0775 14.0884 31.285 14 31.6947 14C32.1044 14 32.3118 14.0884 32.4228 14.1756C32.5301 14.2598 32.613 14.3946 32.6644 14.6324C32.7176 14.8782 32.7267 15.1866 32.7172 15.5667C32.714 15.6941 32.7084 15.834 32.7026 15.9802C32.6922 16.2404 32.681 16.5205 32.681 16.7857L32.681 33.2143C32.681 33.4795 32.6922 33.7596 32.7026 34.0198C32.7084 34.166 32.714 34.3059 32.7172 34.4333C32.7267 34.8134 32.7176 35.1218 32.6644 35.3676C32.613 35.6054 32.5301 35.7402 32.4228 35.8244C32.3118 35.9116 32.1044 36 31.6947 36C31.285 36 31.0775 35.9116 30.9666 35.8244C30.8593 35.7402 30.7763 35.6054 30.725 35.3676C30.6718 35.1218 30.6627 34.8134 30.6722 34.4333C30.6754 34.3059 30.681 34.166 30.6868 34.0198C30.6972 33.7596 30.7084 33.4795 30.7084 33.2143Z"
                        fill="#E5E5E5"
                        stroke="#E5E5E5"
                      />
                    </svg>
                    <svg
                      v-else
                      width="40"
                      height="40"
                      viewBox="0 0 50 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="50" height="50" rx="25" fill="#C493E1" />
                      <path
                        d="M23.1398 15.4316L23.1402 15.4318L27.5787 17.8336L32.0166 20.2351C32.0168 20.2352 32.0169 20.2353 32.0171 20.2354C34.6396 21.657 35.75 23.4178 35.75 25C35.75 26.5823 34.6395 28.3432 32.0166 29.7649L27.5787 32.1664L23.1402 34.5682L23.1398 34.5684C20.5247 35.9859 18.3068 36.0327 16.7934 35.2113C15.2957 34.3984 14.25 32.6039 14.25 29.8036V25V20.1964C14.25 17.3961 15.2957 15.6016 16.7934 14.7887C18.3068 13.9673 20.5247 14.0141 23.1398 15.4316Z"
                        stroke="#E5E5E5"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <!-- #SkipButton -->
                <div class="next-track" @click="onNextHandler">
                  <button>
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M26.9867 24.24L26.9867 7.75998M5.01334 9.62664L5.01334 22.3866C5.01334 25 7.85334 26.64 10.12 25.3333L15.6533 22.1466L21.1867 18.9466C23.4533 17.64 23.4533 14.3733 21.1867 13.0666L15.6533 9.86664L10.12 6.67998C7.85334 5.37331 5.01334 6.99998 5.01334 9.62664Z"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <!-- #LoopButton -->
                <div class="repeat-track">
                  <button v-if="!repeat">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      @click="playLoop"
                    >
                      <path
                        d="M6.54398 6.88H23.2267C25.44 6.88 27.2267 8.66667 27.2267 10.88V15.3067"
                        stroke="black"
                        stroke-opacity="0.7"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.98666 2.66669L4.77333 6.88002L8.98666 11.0934M27.2267 25.12H8.77333C6.56 25.12 4.77333 23.3334 4.77333 21.12V16.6934"
                        stroke="black"
                        stroke-opacity="0.7"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M23.0133 29.3333L27.2267 25.12L23.0133 20.9067"
                        stroke="black"
                        stroke-opacity="0.7"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>

                  <button v-else>
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      @click="playLoop"
                    >
                      <path
                        d="M6.54398 6.88H23.2267C25.44 6.88 27.2267 8.66667 27.2267 10.88V15.3067"
                        stroke="#C493E1"
                        stroke-width="2.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.98668 2.66667L4.77335 6.88L8.98668 11.0933M27.2267 25.12H8.77335C6.56001 25.12 4.77335 23.3333 4.77335 21.12V16.6933"
                        stroke="#C493E1"
                        stroke-width="2.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M23.0133 29.3333L27.2267 25.12L23.0133 20.9067"
                        stroke="#C493E1"
                        stroke-width="2.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- #TrendingSection -->
        <div
          class="row-span-1 col-span-1 sm:col-span-3 sm:row-auto flex flex-col justify-start h-fit sm:h-full max-sm:place-self-center"
          ref="trendingElement"
        >
          <h1
            class="text-2xl font-bold pb-3 max-sm:text-center text-white truncate"
          >
            Trending
          </h1>
          <div
            class="rounded-2xl no-scrollbar overflow-y-scroll sm:pr-2 h-[12rem] sm:h-full"
          >
            <!-- #TrendingList -->
            <!-- for-loop here -->
            <div
              class="flex items-center mb-1 h-fit sm:h-[18.3%] bg-[#E5E5E5] hover:bg-gray-400 transition ease-in-out rounded-2xl overflow-clip cursor-pointer"
              v-for="(track, index) in tracks"
              :key="track.trackId"
              :id="track.trackId"
              @mousedown="onMouseDownChooseTrackHandler"
              @mouseup="onMouseUpChooseTrackHandler"
              ref="tracksElement"
            >
              <!-- #Ranking -->
              <div class="w-fit">
                <h1 class="text-center font-bold w-12">{{ track.trackId }}</h1>
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
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.8267 27.7467C16.3733 27.9067 15.6267 27.9067 15.1733 27.7467C11.3067 26.4267 2.66666 20.92 2.66666 11.5867C2.66666 7.46666 5.98666 4.13333 10.08 4.13333C12.5067 4.13333 14.6533 5.30666 16 7.12C16.685 6.1945 17.5773 5.4423 18.6053 4.92366C19.6333 4.40501 20.7685 4.13434 21.92 4.13333C26.0133 4.13333 29.3333 7.46666 29.3333 11.5867C29.3333 20.92 20.6933 26.4267 16.8267 27.7467Z"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <!-- #MenuButton -->
              <div class="px-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0001 14C13.1046 14 14.0001 13.1046 14.0001 12C14.0001 10.8954 13.1046 10 12.0001 10C10.8955 10 10.0001 10.8954 10.0001 12C10.0001 13.1046 10.8955 14 12.0001 14Z"
                    fill="#231F20"
                  />
                  <path
                    d="M19.0001 14C20.1046 14 21.0001 13.1046 21.0001 12C21.0001 10.8954 20.1046 10 19.0001 10C17.8955 10 17.0001 10.8954 17.0001 12C17.0001 13.1046 17.8955 14 19.0001 14Z"
                    fill="#231F20"
                  />
                  <path
                    d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14Z"
                    fill="#231F20"
                  />
                </svg>
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
  height: 0.3em;
  width: 100%;
  cursor: pointer;
  background-color: #b9b9b9;
}

.progress-current {
  height: inherit;
  width: 0;
  background-color: #c493e1;
  border-radius: 0 2em 2em 0;
}
</style>
