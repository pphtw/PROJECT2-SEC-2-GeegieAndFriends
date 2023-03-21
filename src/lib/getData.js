import { fetchPlaylistsData, fetchTracksData } from '@/lib/fetchData'

let trackData =null;
let playlistData =null;
export const loadData = () => {
    return Promise.all([fetchTracksData(), fetchPlaylistsData()])
        .then(([tracks, playlists]) => {
            trackData = Object.values(tracks);
            playlistData = Object.values(playlists);
        })
        .catch((error) => {
            console.error('Error fetching data:', error.message);
            // Set playlistData to an empty array to prevent errors
            playlistData = [];
        });
};

loadData().then(() => {
    console.log('Data loaded successfully');
}).catch((error) => {
    console.error('Error loading data:', error.message);
});

export const getAllTracks = () => {
    return trackData;
}

export const getTrack = (trackId = 1) => {
    return trackData.find((track) => track['trackId'] === trackId);
}

export const getTrackIdList = (playlistId) => {
    return [
        ...playlistData.find(
            (playlist) => playlist['playlistId'] === Number(playlistId)
        ).tracks,
    ];
}

export const getAllPlaylists = () => {
    return playlistData;
}

export const getPlaylist = (playlistId) => {
    return playlistData.find(
        (playlist) => playlist['playlistId'] === Number(playlistId)
    );
}

export const getTrackList = (playlistId) => {
    return getPlaylist(playlistId).tracks.map((trackId) => getTrack(trackId));
}
