export const fetchTracksData = async () => {
  try {
    const response = await fetch('http://localhost:5000/tracks')
    if (response.ok) {
      return await response.json()
    } else throw new Error('Network response was not ok')
  } catch (error) {
    console.error('Error fetching tracks data:', error.message)
  }
}
export const fetchPlaylistsData = async () => {
  try {
    const response = await fetch('http://localhost:5000/playlists')
    if (response.ok) {
      return await response.json()
    } else throw new Error('Network response was not ok')
  } catch (error) {
    console.error('Error fetching playlists data:', error.message)
  }
}
