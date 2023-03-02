import {audioElement, toggleDelayedPlayPause} from "@/utils/util";
import {musicQueue} from "@/utils/util";
export const playerHandler = () => {
    if (audioElement.value.paused) {
        audioElement.value.play()
        musicQueue.isPlaying = true
    } else {
        audioElement.value.pause()
        musicQueue.isPlaying = false
    }
}
export const trackSkipHandler = (toNext = true) => {
    musicQueue.skipTrack(toNext)
    toggleDelayedPlayPause()
}
