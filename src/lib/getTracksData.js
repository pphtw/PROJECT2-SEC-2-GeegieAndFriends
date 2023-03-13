import metadata from '../assets/metadata.json'
const trackData = metadata.tracks

const playlistData = metadata.playlists


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
export const getPlaylist = (playlistId) => {
  return playlistData.find((playlist) => playlist['playlistId'] === playlistId)
}
export const getTrackList = (PlaylistId) => {
  return getPlaylist(PlaylistId).tracks.map((trackId) => getTrack(trackId));
}