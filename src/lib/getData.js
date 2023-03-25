// import { fetchPlaylistsData, fetchTracksData } from '@/lib/fetchData'

const API_URL = 'http://localhost:5000'

// let trackData = null
// let playlistData = null
// export const loadData = () => {
//   return Promise.all([fetchTracksData(), fetchPlaylistsData()])
//     .then(([tracks, playlists]) => {
//       trackData = Object.values(tracks)
//       playlistData = Object.values(playlists)
//     })
//     .catch((error) => {
//       console.error('Error fetching data:', error.message)
//     })
// }

// loadData()
//   .then(() => {
//     console.log('Data loaded successfully')
//   })
//   .catch((error) => {
//     console.error('Error loading data:', error.message)
//   })

// export const getAllTracks = () => {
//   return trackData
// }

// export const getAllPlaylists = () => {
//   return playlistData
// }

// export const getPlaylist = (playlistId) => {
//   return playlistData.find(
//     (playlist) => playlist['playlistId'] === Number(playlistId)
//   )
// }

export const getAllTracks = () => {
  return fetch(`${API_URL}/tracks`)
    .then(async (response) => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else return Promise.reject(response.statusText)
    })
    .catch((error) => {
      console.error(`ERROR FETCHING ALL TRACK: ${error.message}`)
    })
}

export const getPlaylists = (idList) => {
  const filter = idList.map((id) => 'id=' + id).join('&')
  return fetch(`${API_URL}/playlists?${filter}`)
    .then(async (response) => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else return Promise.reject(response.statusText)
    })
    .catch((error) => {
      console.error(
        `ERROR FETCHING PLAYLISTS OF ID ${idList.join(', ')}: ${error.message}`
      )
    })
}

export const getTrackById = (id) => {
  return fetch(`${API_URL}/tracks/${id}`)
    .then(async (response) => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else return Promise.reject(response.statusText)
    })
    .catch((error) => {
      console.error(`ERROR FETCHING TRACK ID ${id}: ${error.message}`)
    })
}

export const getPlaylistById = (id) => {
  return fetch(`${API_URL}/playlists/${id}`)
    .then(async (response) => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else return Promise.reject(response.statusText)
    })
    .catch((error) => {
      console.error(`ERROR FETCHING PLAYLIST ID ${id}: ${error.message}`)
    })
}

export const getPlaylistTrackIdList = async (playlistId) => {
  const playlist = await getPlaylistById(playlistId)
  return playlist.tracks
}

export const getPlaylistTrackList = (id) => {
  return getPlaylistTrackIdList(id).map((trackId) => getTrackById(trackId))
}
