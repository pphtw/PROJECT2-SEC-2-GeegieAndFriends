import { computed, reactive } from 'vue'
import {
  getPlaylist,
  getTrack,
  getTrackIdList,
  getTrackList,
} from '@/lib/getData'

export const queueStore = reactive({
  // State
  currentPlaylistId: 1,
  tempQueue: [],
  queue: [],
  isShuffled: false,
  isRepeating: false,
  isPlaying: false,

  // Getters
  currentTrack: computed(() => getTrack(queueStore?.queue[0])),

  // Actions
  togglePlayPause: (audioElement) => {
    if (audioElement.paused) {
      audioElement.play()
      queueStore.isPlaying = true
    } else {
      audioElement.pause()
      queueStore.isPlaying = false
    }
  },
  autoPlayPause: (audioElement) => {
    if (queueStore.isPlaying) {
      setTimeout(() => {
        audioElement.play()
      }, 0)
    } else {
      audioElement.pause()
    }
  },
  toggleShuffle: (shuffle) => {
    const currentTrackId = queueStore.queue[0]
    if (shuffle) {
      const restOfQueue = queueStore.queue.filter((e, i) => i !== 0)
      for (let i = restOfQueue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = restOfQueue[i]
        restOfQueue[i] = restOfQueue[j]
        restOfQueue[j] = temp
      }
      queueStore.queue = [currentTrackId, ...restOfQueue]
    } else {
      queueStore.skipToTrack(currentTrackId, queueStore.tempQueue)
      queueStore.queue = queueStore.tempQueue
    }
  },
  skipTrack: (toNext = true, queue = queueStore.queue) => {
    if (toNext) {
      queue.push(queue.shift())
    } else {
      queue.unshift(queue.pop())
    }
  },
  skipToTrack: (id, queue = queueStore.queue) => {
    const indexToSkip = queue.findIndex((trackId) => trackId === Number(id))
    if (Boolean(indexToSkip)) {
      if (indexToSkip < queue.length / 2) {
        while (queue[0] !== id) {
          queueStore.skipTrack(true, queue)
        }
      } else {
        while (queue[0] !== id) {
          queueStore.skipTrack(false, queue)
        }
      }
    }
  },
  chooseTrack(trackId, playlistId = playlistStore.selectedPlaylistId) {
    trackId = Number(trackId)
    if (playlistId === null || undefined) {
      queueStore.queue = [trackId]
      queueStore.tempQueue = [trackId]
    } else {
      if (queueStore.currentPlaylistId !== playlistId) {
        queueStore.currentPlaylistId = playlistId
        queueStore.queue = [...getTrackIdList(queueStore.currentPlaylistId)]
        queueStore.tempQueue = queueStore.queue
        if (queueStore.isShuffled) {
          queueStore.toggleShuffle(true)
        }
      }
      queueStore.skipToTrack(trackId)
      queueStore.isPlaying = true
    }
  },
})
export const playlistStore = reactive({
  // State
  selectedPlaylistId: 1,
  favourites: [],
  pinnedPlaylist: [1, 3, 4, 5, 7, 8],

  // Getters
  selectedPlaylistName: computed(
    () => getPlaylist(playlistStore.selectedPlaylistId).name
  ),
  selectedPlaylist: computed({
    get: () => getTrackList(playlistStore.selectedPlaylistId),
    set: (playlistId) => {
      playlistStore.selectedPlaylistId = Number(playlistId)
    },
  }),
  // Actions
  checkFavorites: (trackId) => {
    return playlistStore.favourites.includes(trackId) // Boolean
  },
  addToFavorites: (trackId) => {
    if (playlistStore.checkFavorites(trackId)) {
      playlistStore.favourites.splice(
        playlistStore.favourites.indexOf(trackId),
        1
      )
    } else {
      playlistStore.favourites.push(trackId)
    }
    localStorage.setItem('favourites', JSON.stringify(playlistStore.favourites))
  },
})
