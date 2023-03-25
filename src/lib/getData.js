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
