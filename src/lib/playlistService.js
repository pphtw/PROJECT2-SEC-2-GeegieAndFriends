import TrackService from "@/lib/trackService";
const trackService = new TrackService()
const API_URL = 'http://localhost:5000'
class PlaylistService {
    async getPlaylistTrackIdList(playlistId) {
        const playlist = await trackService.getItemById('playlists', playlistId);
        return playlist.tracks;
    }
    async getPlaylistTrackList(id){
        const playlistId = await this.getPlaylistTrackIdList(id);
        return trackService.getFilteredItemList('tracks', playlistId)
    }
    async createPlaylist(playlist){
        try {
            const response = await fetch(`${API_URL}/playlists`, {
                method: 'post',
                body: JSON.stringify(playlist),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok){
                return await response.json();
            }else {
                throw new Error(response.statusText);
            }
        }catch (error) {
            console.error(`ERROR CREATING PLAYLIST: ${error.message}`);
        }
    }
    async deletePlaylist(playlistId){
        const playlist = await trackService.getItemById('playlists',playlistId);
        if (playlist.owner === 1){
            console.error(`CANNOT REMOVE THIS PLAYLIST`)
        }else {
            try {
                const response = await fetch(`${API_URL}/playlists/${playlistId}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.ok){
                    return await response.json();
                }else {
                    throw new Error(response.statusText)
                }
            }catch (error){
                console.error(`ERROR DELETING PLAYLIST: ${error.message}`);
            }
        }
    }
    async updatePlaylist(playlistId, newPlaylist){
        const playlist = await trackService.getItemById('playlists',playlistId);
        if (playlist.owner === 1){
            console.error(`CANNOT REMOVE THIS PLAYLIST`)
        } else {
            playlist.name = newPlaylist.name
            playlist.background = newPlaylist.background
            playlist.tracks = newPlaylist.tracks
            try {
                const response = await fetch(`${API_URL}/playlists/${playlistId}`,{
                    method: 'PUT',
                    body: JSON.stringify(playlist),
                    headers: {'Content-Type': 'application/json'}
                });
                if (response.ok){
                    return await response.json()
                } else {
                    throw new Error(response.statusText)
                }
            }catch (error) {
                console.error(`ERROR UPDATING PLAYLIST: ${error.message}`);
            }
        }
    }
}
export default PlaylistService;