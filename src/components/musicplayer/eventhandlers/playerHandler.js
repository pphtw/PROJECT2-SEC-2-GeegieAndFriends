import {audioElement} from "@/components/musicplayer/progressBar";
import {musicQueue} from "@/components/musicplayer/musicQueue";

const playerHandler = () => {
    if (audioElement.value.paused) {
        audioElement.value.play()
        musicQueue.isPlaying = true
    } else {
        audioElement.value.pause()
        musicQueue.isPlaying = false
    }
}
export {playerHandler}