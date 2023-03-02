import {computed, reactive} from "vue";
import {getPlaylist, getTrack} from "@/utils/storage";

const playlist = reactive({
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
export {playlist}