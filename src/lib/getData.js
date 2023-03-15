import {fetchPlaylistsData, fetchTracksData} from "@/lib/fetchData";
const trackData = await fetchTracksData()
const playlistData = await fetchPlaylistsData()
export const getTrack = (trackId = 1) => {
  return trackData.find((track) => track['trackId'] === trackId)
}
export const getTrackIdList = (playlistId) => {
  return [
    ...playlistData.find(
        (playlist) => playlist['playlistId'] === Number(playlistId)
    ).tracks,
  ]
}
export const getAllPlaylists = () => {
  return playlistData
}
export const getPlaylist = (playlistId) => {
  return playlistData.find((playlist) => playlist['playlistId'] === Number(playlistId))
}
export const getTrackList = (playlistId) => {
  return getPlaylist(playlistId).tracks.map((trackId) => getTrack(trackId))
}