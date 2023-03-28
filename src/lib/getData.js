const API_URL = 'http://localhost:5000'

export const getAllItems = (item) => {
  return fetch(`${API_URL}/${item}`)
    .then(async (response) => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else return Promise.reject(response.statusText)
    })
    .catch((error) => {
      console.error(
        `ERROR FETCHING ALL ${item.toUpperCase()}: ${error.message}`
      )
    })
}

export const getFilteredItemList = (item, idList) => {
  const filter = idList.map((id) => 'id=' + id).join('&')
  return fetch(`${API_URL}/${item}?${filter}`)
    .then(async (response) => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else return Promise.reject(response.statusText)
    })
    .catch((error) => {
      console.error(
        `ERROR FETCHING ${item.toUpperCase()} OF ID ${idList.join(', ')}: ${
          error.message
        }`
      )
    })
}

export const getItemById = (item, id) => {
  return fetch(`${API_URL}/${item}/${id}`)
    .then(async (response) => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else return Promise.reject(response.statusText)
    })
    .catch((error) => {
      console.error(
        `ERROR FETCHING ${item.toUpperCase()} ID ${id}: ${error.message}`
      )
    })
}

export const getPlaylistTrackIdList = async (playlistId) => {
  return (await getItemById('playlists', playlistId)).tracks
}

export const getPlaylistTrackList = async (id) => {
  return await getFilteredItemList('tracks', await getPlaylistTrackIdList(id))
}

export const createPlaylist = (playlist) => {
  fetch(`${API_URL}/playlists`, {
    method: 'post',
    body: JSON.stringify(playlist),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(async (response) => {
      const data = await response.json()
      if (response.ok) {
        console.log(data)
      } else return Promise.reject(response.statusText)
    })
    .catch((error) => {
      console.error(`ERROR FETCHING ${error.message}`)
    })
}

export const deletePlaylist = async (playlistId) => {
  if ((await getItemById('playlists', playlistId)).owner === 1) {
    console.error(`CANNOT REMOVE THIS PLAYLIST`)
  } else {
    fetch(`${API_URL}/playlists/${playlistId}`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (response) => {
        const data = await response.json()
        if (response.ok) {
          console.log(data)
        } else return Promise.reject(response.statusText)
      })
      .catch((error) => {
        console.error(`ERROR FETCHING ${error.message}`)
      })
  }
}

export const updatePlaylist = async (playlistId, newPlaylist) => {
  const playlist = await getItemById('playlists', playlistId)

  if (playlist.owner === 1) {
    console.error(`CANNOT UPDATE THIS PLAYLIST`)
  } else {
    console.log(playlist)
    //update
    playlist.name =
      newPlaylist.name === undefined ? playlist.name : newPlaylist.name
    playlist.background =
      newPlaylist.background === undefined
        ? playlist.background
        : newPlaylist.background
    playlist.tracks =
      newPlaylist.tracks === undefined ? playlist.tracks : newPlaylist.tracks

    console.log(playlist)

    fetch(`${API_URL}/playlists/${playlistId}`, {
      method: 'PUT',
      body: JSON.stringify(playlist),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (response) => {
        const data = await response.json()
        if (response.ok) {
        } else return Promise.reject(response.statusText)
      })
      .catch((error) => {
        console.error(`ERROR FETCHING ${error.message}`)
      })
  }
}

export const searchItems = (item, input) => {
  return fetch(`${API_URL}/${item}?q=${input}`, {
    method: 'get',
    headers: {
      searchableAttributes: ['name', 'keywords'],
    },
  })
    .then(async (response) => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else return Promise.reject(response.statusText)
    })
    .catch((error) => {
      console.error(
        `ERROR FETCHING ALL ${item.toUpperCase()}: ${error.message}`
      )
    })
}
