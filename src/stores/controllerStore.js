import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { getTrack, getTrackIdList } from '@/lib/getData'
import { shuffleArray } from '@/lib/util'
import { usePlaylistStore } from '@/stores/playlistStore'

export const useControllerStore = defineStore('controller', () => {
  const playlist = usePlaylistStore()

  // State
  const currentPlaylistId = ref(1)
  const q = reactive({
    queue: [],
    defaultQueue: [],
    tempQueue: [],
    dumpQueue: [],
  })
  const isShuffled = ref(false)
  const isRepeating = ref(false)
  const isPlaying = ref(false)

  // Getters
  const currentTrack = computed(() => getTrack(q.queue[0]))
  const controllerState = computed(() => {
    if (isShuffled.value && isRepeating.value) {
      // console.log(3)
      return 3
    } else if (isShuffled.value && !isRepeating.value) {
      // console.log(2)
      return 2
    } else if (!isShuffled.value && isRepeating.value) {
      // console.log(1)
      return 1
    } else {
      console.log('kuy')
      return 0
    }
  })
  const selectedPlaylist = computed(() => playlist.selectedPlaylist)

  // Actions
  const togglePlayPause = (audioElement) => {
    if (audioElement.paused) {
      audioElement.play()
      isPlaying.value = true
    } else {
      audioElement.pause()
      isPlaying.value = false
    }
  }
  const togglePlay = (audioElement, ms = 0) => {
    setTimeout(() => {
      audioElement.play()
    }, ms)
  }
  const autoPlayPause = (audioElement) => {
    if (isPlaying.value) {
      setTimeout(() => {
        audioElement.play()
      }, 0)
    } else {
      audioElement.pause()
    }
  }
  const toggleShuffle = () => {
    const state = controllerState.value
    console.log(state)
    switch (state) {
      case 0: //no shuffle & no repeat -->  shuffle & no repeat
        console.log('case 0 NoShuffle & NoRepeat')
        // skipToTrack(currentTrack.value.trackId, q.defaultQueue)
        // q.queue = [...q.defaultQueue]
        q.queue = shuffleArray(q.queue)
        // q.queue.push(...q.dumpQueue)
        break
      case 1: //no shuffle & repeat
        // skipToTrack(q.queue[0], q.tempQueue)
        // q.queue = [...q.tempQueue]

        console.log('case 1: NoShuffle & Repeat')
        break
      case 2: //shuffle & no repeat --> no shuffle & no repeat
        // q.queue.push(...q.dumpQueue)
        // q.queue = shuffleArray(q.queue)

        console.log('case 2: Shuffle & NoRepeat')
        break
      case 3: //shuffle & repeat
        // q.tempQueue = q.queue
        // q.queue = shuffleArray(q.queue)
        console.log('case 3 (Shuffle): Shuffle & Repeat')
        break
    }
  }
  const toggleRepeat = () => {
    switch (controllerState.value) {
      case 1:
      case 3: {
        // q.queue.push(...q.dumpQueue)
        // q.dumpQueue = []
        console.log('case 3 (Loop): Shuffle & Repeat')
        break
      }
    }
  }
  const skipTrack = (toNext = true, queue = q.queue, toTrack = false) => {
    const onRepeat = isRepeating.value
    if (toNext) {
      if (onRepeat) {
        console.log('Skip: Repeat')
        console.log(q.queue)
        queue.push(queue.shift())
      } else {
        // Default (No Shuffle)
        console.log('Skip: NoRepeat')
        if (q.queue.length > 0) {
          q.dumpQueue.push(queue.shift())
          console.log(q.queue)
          console.log(q.dumpQueue)
        }
      }
    } else {
      if (onRepeat) {
        console.log('SkipBack: Repeat')
        console.log(q.queue)
        queue.unshift(queue.pop())
      } else {
        // Default (No Shuffle)
        console.log('SkipBack: NoRepeat')
        if (q.dumpQueue.length !== 0) {
          queue.unshift(q.dumpQueue.pop())
          console.log(q.queue)
          console.log(q.dumpQueue)
        }
      }
    }
  }
  const skipToTrack = (id, queue = q.queue) => {
    const indexToSkip = queue.findIndex((trackId) => trackId === Number(id))
    if (Boolean(indexToSkip)) {
      console.log('found')
      console.log(indexToSkip)
      // if (indexToSkip < queue.length / 2) {
      //   console.log('Repeating Skip Back...')
      //   while (queue[0] !== id) {
      //     skipTrack(true, queue, true)
      //   }
      // } else {
      //   console.log('Repeating Skip...')
      //   while (queue[0] !== id) {
      //     skipTrack(false, queue, true)
      //   }
      // }
    }
  }
  const chooseTrack = (id, selectPlaylist = selectedPlaylist) => {
    const trackId = Number(id)
    if (playlist === null || undefined) {
      q.queue = [...getTrackIdList(currentPlaylistId.value)]
      q.tempQueue = q.queue
    } else {
      if (currentPlaylistId.value !== playlist.selectedPlaylistId) {
        currentPlaylistId.value = playlist.selectedPlaylistId
        q.queue = [...getTrackIdList(currentPlaylistId.value)]
        console.log(q.queue)
        console.log(currentPlaylistId.value)
        console.log(playlist.selectedPlaylistId)
      }
      skipToTrack(trackId)
      isPlaying.value = true
    }
    //   if (currentPlaylistId.value !== playlistId) {
    //     currentPlaylistId.value = playlistId
    //     q.queue = [...getTrackIdList(currentPlaylistId)]
    //     q.tempQueue = q.queue
    //     if (isShuffled) {
    //       toggleShuffle(true)
    //     }
    //   }
    // }
  }
  const setQueue = (queue) => {
    q.queue = [...queue]
    q.defaultQueue = [...queue]
  }
  const initController = () => {
    setQueue(getTrackIdList(1))
    console.log(controllerState.value)
    playlist.likedTracks = JSON.parse(localStorage.getItem('likedTracks')) ?? []
    isShuffled.value = false
    isRepeating.value = false
  }
  return {
    q,
    isShuffled,
    isRepeating,
    isPlaying,
    currentTrack,
    togglePlayPause,
    togglePlay,
    toggleShuffle,
    toggleRepeat,
    autoPlayPause,
    skipTrack,
    chooseTrack,
    setQueue,
    initController,
  }
})
