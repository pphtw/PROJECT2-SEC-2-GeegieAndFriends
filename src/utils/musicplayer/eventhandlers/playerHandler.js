import {audioElement} from "@/utils/musicplayer/progressBar";
import {musicQueue} from "@/utils/musicplayer/musicQueue";

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