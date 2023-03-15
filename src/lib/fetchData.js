export const fetchTracksData = async () => {
    try {
        const response = await fetch('http://localhost:5000/tracks')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching tracks data:', error.message)
    }
}
export const fetchPlaylistsData = async () => {
    try {
        const response = await fetch('http://localhost:5000/playlists')
        // !response.ok return true false
        if (!response.ok) {
            throw new Error('Network response was not ok')

        }
        const data = await response.json()
        return data
    }catch (error){
        console.error('Error fetching playlists data:', error.message)
    }
}