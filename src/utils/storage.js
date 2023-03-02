import metadata from '../assets/metadata.json'


const playlistData = metadata.playlists
const trackData = metadata.tracks
export const getTrack = (trackId = 1) => {
    return trackData.find((track) => track['trackId'] === trackId);
};

export const getTrackList = (playlistId) => {
    return [
        ...playlistData.find(
            (playlist) => playlist['playlistId'] === Number(playlistId)
        ).tracks,
    ];
};

export const getPlaylist = (playlistId) => {
    return playlistData.find((playlist) => playlist['playlistId'] === playlistId);
};
const STORAGE = localStorage
const FAVOURITE_KEY = 'favourite'
const storage = {
    get(key , data = []) {
        if (STORAGE){
            return STORAGE.getItem(key)
            ? Array.isArray(data)
                ? JSON.parse(STORAGE.getItem(key))
                    :STORAGE.getItem(key)
                :data
        }
    },
    set(key, val){
        if (STORAGE){
            STORAGE.setItem(key, val)
        }
    },
    clear(key){
        if (STORAGE){
            STORAGE.clear()
        }
    }
}
const favourite = storage.get(FAVOURITE_KEY)
export const checkFavourite = (trackId) => {
    const arr = [...favourite]
    return arr.includes(trackId)
}
export const onLikeHandler = (e, trackId) => {
    e.stopPropagation();
    if (checkFavourite(trackId)) {
        favourite.splice(favourite.indexOf(trackId),1)
    } else {
        favourite.push(trackId)
    }
    storage.set('favourite', JSON.stringify(favourite));
};