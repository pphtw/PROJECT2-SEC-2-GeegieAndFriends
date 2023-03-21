const API_URL = 'http://localhost:5000'
export const fetchTracksData = async () => {
  try {
    const response = await fetch(`${API_URL}/tracks`)
    if (response.ok) {
      const tracks = await response.json();
      return tracks;
    } else throw new Error('Network response was not ok')
  } catch (error) {
    console.error('Error fetching tracks data:', error.message)
  }
}
export const fetchPlaylistsData = async () => {
  try {
    const response = await fetch(`${API_URL}/playlists`)
    if (response.ok) {
      const playlists = await response.json();
      return playlists;
    } else throw new Error('Network response was not ok')
  } catch (error) {
    console.error('Error fetching playlists data:', error.message)
  }
}
