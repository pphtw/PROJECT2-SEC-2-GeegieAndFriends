import metadata from '../assets/metadata.json'

const playlistData = metadata.playlists
const trackData = metadata.tracks
export const getTrack = (trackId = 1) => {
    return trackData.find((track) => track['trackId'] === trackId)
}
export const getTrackList = (playlistId) => {
    return [
        ...playlistData.find(
            (playlist) => playlist['playlistId'] === Number(playlistId)
        ).tracks,
    ]
}
export const getPlaylist = (playlistId) => {
    return playlistData.find((playlist) => playlist['playlistId'] === playlistId)
}