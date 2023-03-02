import {reactive, computed, ref} from "vue";
import {getPlaylist, getTrack} from "./storage";

export const musicQueue = reactive({
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

export const audioElement = ref(null)
export const progressBar = reactive({
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
        progressBar.barWidth = (x / progressBar.boundingRect.width) * 100 + '%'
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
export const playlist = reactive({
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
export const secToMin = (timeInSec) => {
    return new Date(timeInSec * 1000).toISOString().substring(14, 19)
}
export const toggleDelayedPlayPause = (delay = 0) => {
    setTimeout(() => {
        if (musicQueue.isPlaying) {
            audioElement.value.play()
        } else {
            audioElement.value.pause()
        }
    }, delay)
}

export const onLoadMetadataHandler = () => {
    progressBar.duration = secToMin(audioElement.value.duration)
    progressBar.currentTime = secToMin(audioElement.value.currentTime)
    progressBar.updateProgressBar()
    isOverflowed()
}
const isOverflow = ref(null)
const titleElement = ref(null)
const isOverflowed = () => {
    const element = titleElement.value
    isOverflow.value = false
    setTimeout(() => {
        isOverflow.value =
            element.scrollHeight > element.offsetHeight ||
            element.scrollWidth > element.offsetWidth
    }, 0)
}
export {isOverflow,titleElement}
