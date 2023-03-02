import {reactive, computed} from "vue";
import {getTrack} from "../gettrackdata/getTrackData";

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
export { musicQueue }