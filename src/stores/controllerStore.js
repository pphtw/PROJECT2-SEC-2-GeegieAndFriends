import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import {getTrack, getTrackIdList, loadData} from '@/lib/getData'
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
      // console.log(0)
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
      case 0: //no shuffle & no repeat
        console.log('case 0 NoShuffle & NoRepeat')
        skipToTrack(currentTrack.value.trackId, q.defaultQueue, true)
        q.queue = [...q.defaultQueue]
        q.tempQueue = [...q.defaultQueue]
        // q.queue.push(...q.dumpQueue)
        break
      case 1: //no shuffle & repeat
        // skipToTrack(q.queue[0], q.tempQueue)
        // q.queue = [...q.tempQueue]
        skipToTrack(currentTrack.value.trackId, q.defaultQueue, true)
        q.queue = [...q.defaultQueue]
        q.tempQueue = [...q.defaultQueue]
        console.log('case 1: NoShuffle & Repeat')
        break
      case 2: //shuffle & no repeat
        q.queue = shuffleArray(q.queue)
        q.tempQueue = [...q.queue]
        // q.queue.push(...q.dumpQueue)
        // q.queue = shuffleArray(q.queue)

        console.log('case 2: Shuffle & NoRepeat')
        break
      case 3: //shuffle & repeat
        // q.tempQueue = q.queue
        // q.queue = shuffleArray(q.queue)
        q.queue = shuffleArray(q.queue)
        q.tempQueue = [...q.queue]
        console.log('case 3 (Shuffle): Shuffle & Repeat')
        break
    }
  }
  const toggleRepeat = () => {
    switch (controllerState.value) {
      case 0: {
        console.log('case 3 (Loop): No Shuffle & No Repeat')
        skipToTrack(currentTrack.value.trackId, q.defaultQueue, true)
        q.queue = [...q.defaultQueue]
        q.tempQueue = [...q.defaultQueue]
        break
      }
      case 1:
      case 3: {
        q.queue.push(...q.dumpQueue)
        q.dumpQueue = []
        console.log('case 3 (Loop): Shuffle & Repeat')
        break
      }
    }
  }
  const skipTrack = (toNext = true, repeating = false, queue = q.queue) => {
    const onRepeat = isRepeating.value
    if (toNext) {
      if (onRepeat || repeating) {
        console.log('Skip: Repeat')
        // console.log(q.queue)
        queue.push(queue.shift())
      } else {
        // Default (No Shuffle)
        console.log('Skip: NoRepeat')
        if (q.queue.length > 0) {
          q.dumpQueue.push(queue.shift())

          // console.log(q.tempQueue)
          console.log(q.queue)
          console.log(q.dumpQueue)
        }
      }
    } else {
      if (onRepeat || repeating) {
        console.log('SkipBack: Repeat')
        queue.unshift(queue.pop())
      } else {
        // Default (No Shuffle)
        console.log('SkipBack: NoRepeat')
        if (q.dumpQueue.length !== 0) {
          queue.unshift(q.dumpQueue.pop())

          // console.log(q.tempQueue)
          console.log(q.queue)
          console.log(q.dumpQueue)
        }
      }
    }
  }
  const skipToTrack = (id, queue = q.queue, repeat = false) => {
    const indexToSkip = q.tempQueue.findIndex(
      (trackId) => trackId === Number(id)
    )

    if (isRepeating.value || repeat) {
      console.log('Repeat')
      if (indexToSkip < q.tempQueue.length / 2) {
        while (queue[0] !== id) {
          skipTrack(true, true, queue)
        }
      } else {
        while (queue[0] !== id) {
          skipTrack(false, true, queue)
        }
      }
    } else {
      console.log('NoRepeat')
      if (!q.dumpQueue.includes(id)) {
        while (queue[0] !== id) {
          skipTrack(true, false, queue)
        }
      } else {
        while (queue[0] !== id) {
          skipTrack(false, false, queue)
        }
      }
    }
    console.log(indexToSkip)
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
        q.tempQueue = q.queue
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
    q.tempQueue = [...queue]
  }
  const initController = async () => {
    await loadData()
    setQueue(getTrackIdList(1))
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
