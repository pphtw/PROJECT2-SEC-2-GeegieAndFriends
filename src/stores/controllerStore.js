import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { getAllItems, getItemById, getPlaylistTrackIdList } from '@/lib/getData'
import { secToMin, shuffleArray } from '@/lib/util'
import { usePlaylistStore } from '@/stores/playlistStore'

export const useControllerStore = defineStore('controller', () => {
  const playlist = usePlaylistStore()

  // State
  const currentTrack = ref({})

  const q = reactive({
    currentPlaylistId: 1,
    queue: [1],
    defaultQueue: [],
    tempQueue: [],
    dumpQueue: [],
  })
  const isShuffled = ref(false)
  const isRepeating = ref(false)
  const isPlaying = ref(false)
  const progressBar = reactive({
    isClicked: false,
    currentTime: 0,
    duration: 0,
    width: computed(
      () => (progressBar.currentTime / progressBar.duration) * 100 + '%'
    ),
    boundingRect: new DOMRect(),
    updateTime: (currentTime) => {
      progressBar.currentTime = currentTime
    },
    updateProgress: (e) => {
      const x = progressBar.validateX(e.clientX)
      progressBar.updateTime(
        (x / progressBar.boundingRect.width) * progressBar.duration
      )
      progressBar.progress = x / progressBar.boundingRect.width
    },
    validateX: (x) => {
      if (x < progressBar.boundingRect.left) {
        return 0
      } else if (x > progressBar.boundingRect.right) {
        return progressBar.boundingRect.width
      } else {
        return x - progressBar.boundingRect.left
      }
    },
  })
  // Getters
  watch(
    () => q.queue[0],
    async (id) => {
      currentTrack.value = await getItemById('tracks', id)
    }
  )
  // const currentTrack = computed(async () => {
  //   return await getItemById('tracks', q.queue[0])
  // })
  const controllerState = computed(() => {
    if (isShuffled.value && isRepeating.value) {
      return 3
    } else if (isShuffled.value && !isRepeating.value) {
      return 2
    } else if (!isShuffled.value && isRepeating.value) {
      return 1
    } else {
      return 0
    }
  })

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
    const trackId = currentTrack.value.id
    switch (state) {
      case 0: //no shuffle & no repeat
        q.dumpQueue = q.defaultQueue.slice(
          0,
          q.defaultQueue.findIndex((i) => i === trackId)
        )
        q.queue = q.defaultQueue.slice(
          q.defaultQueue.findIndex((i) => i === trackId)
        )
        console.log(q.queue)
        console.log(q.dumpQueue)
        // console.log('case 0 S')
        break
      case 1: //no shuffle & repeat
        q.tempQueue = [...q.defaultQueue]
        skipToTrack(trackId, q.tempQueue)
        q.queue = [...q.tempQueue]
        console.log(q.queue)
        console.log('case 1 S')
        break
      case 2: //shuffle & no repeat
        q.queue = shuffleArray(q.queue)
        q.tempQueue = [...q.queue]
        // console.log('case 2 S')
        break
      case 3: //shuffle & repeat
        q.queue = shuffleArray(q.queue)
        q.tempQueue = [...q.queue]
        // console.log('case 3 S')
        break
    }
  }
  const toggleRepeat = () => {
    const trackId = currentTrack.value.id
    switch (controllerState.value) {
      case 0: {
        q.dumpQueue = q.defaultQueue.slice(
          0,
          q.defaultQueue.findIndex((i) => i === trackId)
        )
        q.queue = q.defaultQueue.slice(
          q.defaultQueue.findIndex((i) => i === trackId)
        )
        // console.log('case 0 L')
        break
      }
      case 1:
      case 3: {
        q.queue.push(...q.dumpQueue)
        q.dumpQueue = []
        // console.log('case 3 L')
        break
      }
    }
  }
  const skipTrack = (toNext = true, repeating = false, queue = q.queue) => {
    const onRepeat = isRepeating.value
    if (toNext) {
      if (onRepeat || repeating) {
        console.log('Skip: Repeat')
        queue.push(queue.shift())
        console.log(q.queue)
      } else {
        // Default (No Shuffle)
        console.log('Skip: NoRepeat')
        if (q.queue.length > 1) {
          q.dumpQueue.push(queue.shift())

          console.log(q.queue)
          console.log(q.dumpQueue)
        }
      }
    } else {
      if (onRepeat || repeating) {
        console.log('SkipBack: Repeat')
        queue.unshift(queue.pop())
        console.log(q.queue)
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
    savePlaybackState()
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
          skipToTrack(true, false, queue)
        }
      } else {
        while (queue[0] !== id) {
          skipTrack(false, false, queue)
        }
      }
    }
    console.log(indexToSkip)
    savePlaybackState()
  }
  const chooseTrack = async (id, playlistId) => {
    const trackId = Number(id)
    const state = controllerState.value

    if (q.currentPlaylistId !== playlistId) {
      q.currentPlaylistId = playlistId
      q.queue = await getPlaylistTrackIdList(q.currentPlaylistId)
      q.tempQueue = [...q.queue]
      q.defaultQueue = [...q.queue]
      q.dumpQueue = []
    }
    switch (state) {
      case 0: {
        q.dumpQueue = q.defaultQueue.slice(
          0,
          q.defaultQueue.findIndex((i) => i === trackId)
        )
        q.queue = q.defaultQueue.slice(
          q.defaultQueue.findIndex((i) => i === trackId)
        )
        console.log(q.queue)
        console.log(q.dumpQueue)
        break
      }
      case 1:
      case 3: {
        skipToTrack(trackId, q.queue)
        break
      }
      case 2: {
        q.dumpQueue = q.tempQueue.slice(
          0,
          q.tempQueue.findIndex((i) => i === trackId)
        )
        q.queue = q.tempQueue.slice(q.tempQueue.findIndex((i) => i === trackId))
        console.log(q.queue)
        console.log(q.dumpQueue)
      }
    }
    isPlaying.value = true
    savePlaybackState()
  }
  const savePlaybackState = () => {
    const playbackState = {
      queue: q.queue,
      dumpQueue: q.dumpQueue,
    }
    localStorage.setItem('playbackState', JSON.stringify(playbackState))
  }

  const loadPlaybackState = () => {
    const storedState = localStorage.getItem('playbackState')
    if (storedState) {
      const playbackState = JSON.parse(storedState)
      q.queue = playbackState.queue
      q.dumpQueue = playbackState.dumpQueue
    }
  }
  const setQueue = (queue) => {
    q.queue = [...queue]
    q.defaultQueue = [...queue]
    q.tempQueue = [...queue]
  }
  const initController = async () => {
    currentTrack.value = await getItemById('tracks', q.queue[0])
    setQueue(await getPlaylistTrackIdList(1))
    loadPlaybackState()
    playlist.likedTracks = JSON.parse(localStorage.getItem('likedTracks')) ?? []
    isShuffled.value = false
    isRepeating.value = false
  }

  return {
    q,
    progressBar,
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
