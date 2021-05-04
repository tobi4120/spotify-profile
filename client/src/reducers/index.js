import { combineReducers } from 'redux';

const userReducer = (current_user={}, action) => {
    switch (action.type) {
        case "GET_USER_INFO":

            return action.payload.data

        default:
            return current_user;
    }
};

const followingReducer = (following={}, action) => {
    switch (action.type) {
        case "GET_FOLLOWING":

            return action.payload.data

        default:
            return following;
    }
};

const playlistReducer = (playlists={}, action) => {
    switch (action.type) {
        case "GET_PLAYLISTS":

            return action.payload.data

        default:
            return playlists;
    }
};

const topArtistsReducer = (top_artists={}, action) => {
    switch (action.type) {
        case "GET_TOP_ARTISTS_LONG":

            return {...top_artists, long: action.payload.data}

        default:
            return top_artists;
    }
};

const topTracksReducer = (top_tracks={}, action) => {
    switch (action.type) {
        case "GET_TOP_TRACKS_LONG":

            return {...top_tracks, long: action.payload.data}

        default:
            return top_tracks;
    }
};

export default combineReducers({
    current_user: userReducer,
    following: followingReducer,
    playlists: playlistReducer,
    top_artists: topArtistsReducer,
    top_tracks: topTracksReducer,
});