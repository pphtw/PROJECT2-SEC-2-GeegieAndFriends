import { computed, reactive } from 'vue'
import {
  getPlaylist,
  getTrack,
  getTrackIdList,
  getTrackList,
} from '@/lib/getData'
import { shuffleArray } from '@/lib/utils'
export const queueStore = reactive({
  // State
  currentPlaylistId: 1,

  queue: [],
  defaultQueue: [],
  tempQueue: [],
  dumpQueue: [],
  isShuffled: false,
  isRepeating: false,
  isPlaying: false,

  // Getters
  currentTrack: computed(() => getTrack(queueStore?.queue[0])),
  controllerState: computed(() => {
    if (queueStore.isShuffled && queueStore.isRepeating) {
      return 3
    } else if (!queueStore.isShuffled && queueStore.isRepeating) {
      return 2
    } else if (queueStore.isShuffled && !queueStore.isRepeating) {
      return 1
    } else {
      return 0
    }
  }),
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
  toggleShuffle: () => {
    switch (queueStore.controllerState) {
      case 0: //no shuffle & no repeat
        queueStore.queue.push(...queueStore.dumpQueue)
        break
      case 1: //no shuffle & repeat
        queueStore.tempQueue = queueStore.skipToTrack(queueStore.queue[0])
        queueStore.queue = [...queueStore.tempQueue]
        break
      case 2: //shuffle & no repeat
        queueStore.queue.push(...queueStore.dumpQueue)
        queueStore.queue = shuffleArray(queueStore.queue)
        break
      case 3: //shuffle & repeat
        queueStore.tempQueue = queueStore.queue
        queueStore.queue = shuffleArray(queueStore.queue)
        break
    }
    queueStore.isShuffled = !queueStore.isShuffled
  },
  toggleRepeat: () => {
    switch (queueStore.controllerState) {
      case 1:
      case 3: {
        queueStore.queue.push(...queueStore.dumpQueue)
        queueStore.dumpQueue = []
        break
      }
    }
    queueStore.isRepeating = !queueStore.isRepeating
  },
  skipTrack: (toNext = true, queue = queueStore.queue) => {
    let onRepeat = queueStore.isRepeating
    if (toNext && onRepeat) {
      queue.push(queue.shift())
    } else if (!toNext && onRepeat) {
      queue.unshift(queue.pop())
    } else if (toNext && !onRepeat) {
      queueStore.dumpQueue.push(queue.shift())
    } else {
      if (queueStore.dumpQueue.length !== 0)
        queue.unshift(queueStore.dumpQueue.pop())
    }
  },
  skipToTrack: (id, queue = queueStore.queue) => {
    const indexToSkip = queue.findIndex((trackId) => trackId === Number(id))
    if (Boolean(indexToSkip)) {
      if (indexToSkip < queue.length / 2) {
        while (queue[0] !== id) {
          queueStore.skipTrack(true, true, queue)
        }
      } else {
        while (queue[0] !== id) {
          queueStore.skipTrack(false, true, queue)
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
