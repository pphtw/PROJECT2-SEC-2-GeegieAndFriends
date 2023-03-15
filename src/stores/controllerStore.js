import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { getTrack, getTrackIdList } from '@/lib/getData'
import { shuffleArray } from '@/lib/util'
import { usePlaylistStore } from '@/stores/usePlaylistStore'

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
    if (isShuffled && isRepeating) {
      return 3
    } else if (!isShuffled && isRepeating) {
      return 2
    } else if (isShuffled && !isRepeating) {
      return 1
    } else {
      return 0
    }
  })
  const selectedPlaylistId = computed(() => playlist.selectedPlaylist)

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
  const autoPlayPause = (audioElement) => {
    if (isPlaying) {
      setTimeout(() => {
        audioElement.play()
      }, 0)
    } else {
      audioElement.pause()
    }
  }
  const toggleShuffle = () => {
    switch (controllerState) {
      case 0: //no shuffle & no repeat
        q.queue.push(...q.dumpQueue)
        break
      case 1: //no shuffle & repeat
        skipToTrack(q.queue[0], q.tempQueue)
        q.queue = [...q.tempQueue]
        break
      case 2: //shuffle & no repeat
        q.queue.push(...q.dumpQueue)
        q.queue = shuffleArray(q.queue)
        break
      case 3: //shuffle & repeat
        q.tempQueue = q.queue
        q.queue = shuffleArray(q.queue)
        break
    }
    isShuffled.value = !isShuffled.value
  }
  const toggleRepeat = () => {
    switch (controllerState) {
      case 1:
      case 3: {
        q.queue.push(...q.dumpQueue)
        q.dumpQueue = []
        break
      }
    }
    isRepeating.value = !isRepeating.value
  }
  const skipTrack = (toNext = true, queue = q.queue) => {
    let onRepeat = isRepeating
    if (toNext && onRepeat) {
      queue.push(queue.shift())
    } else if (!toNext && onRepeat) {
      queue.unshift(queue.pop())
    } else if (toNext && !onRepeat) {
      q.dumpQueue.push(queue.shift())
    } else {
      if (q.dumpQueue.length !== 0) queue.unshift(q.dumpQueue.pop())
    }
  }
  const skipToTrack = (id, queue = q.queue) => {
    const indexToSkip = queue.findIndex((trackId) => trackId === Number(id))
    if (Boolean(indexToSkip)) {
      if (indexToSkip < queue.length / 2) {
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
  const chooseTrack = (id, playlistId = Number(selectedPlaylistId)) => {
    const trackId = Number(id)
    if (playlistId === null || undefined) {
      q.queue = [trackId]
      q.tempQueue = [trackId]
    } else {
      if (currentPlaylistId.value !== playlistId) {
        currentPlaylistId.value = playlistId
        q.queue = [...getTrackIdList(currentPlaylistId)]
        q.tempQueue = q.queue
        if (isShuffled) {
          toggleShuffle(true)
        }
      }
      skipToTrack(trackId)
      isPlaying.value = true
    }
  }

  return {
    isShuffled,
    isRepeating,
    isPlaying,
    currentTrack,
    togglePlayPause,
    toggleShuffle,
    toggleRepeat,
    autoPlayPause,
    skipTrack,
    chooseTrack,
  }
})
