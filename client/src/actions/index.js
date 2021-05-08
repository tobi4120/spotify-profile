import axios from 'axios';

// Get basic user info
export const get_user_info = (accessToken) =>
    async (dispatch) => {
        
        const response = await axios.get("https://api.spotify.com/v1/me", { 
            headers: { "Authorization" : `Bearer ${accessToken}` } 
        })

        dispatch({ type: 'GET_USER_INFO', payload: response });
    }

// Get the artists that the user follows
export const get_following = (accessToken) =>
    async (dispatch) => {
        
        const response = await axios.get("https://api.spotify.com/v1/me/following", {
            params: {
                limit: 50,
                type: "artist"
            },  
            headers: { "Authorization" : `Bearer ${accessToken}` }
        })

        dispatch({ type: 'GET_FOLLOWING', payload: response });
    }

// Get user's playlists
export const get_playlists = (accessToken) =>
    async (dispatch) => {
        
        const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
            params: {
                limit: 50,
            },  
            headers: { "Authorization" : `Bearer ${accessToken}` }
        })

        dispatch({ type: 'GET_PLAYLISTS', payload: response });
    }

// Get user's top artists (long term)
export const get_topArtists_long = (accessToken) => 
    async (dispatch) => {
        
        const response = await axios.get("https://api.spotify.com/v1/me/top/artists", {
            params: {
                time_range: "long_term",
                limit: 50,
            },  
            headers: { "Authorization" : `Bearer ${accessToken}` }
        })

        dispatch({ type: 'GET_TOP_ARTISTS_LONG', payload: response });
    }

// Get user's top artists (med. term)
export const get_topArtists_medium = (accessToken) => 
    async (dispatch) => {
        
        const response = await axios.get("https://api.spotify.com/v1/me/top/artists", {
            params: {
                time_range: "medium_term",
                limit: 50,
            },  
            headers: { "Authorization" : `Bearer ${accessToken}` }
        })

        dispatch({ type: 'GET_TOP_ARTISTS_MEDIUM', payload: response });
    }

// Get user's top artists (short term)
export const get_topArtists_short = (accessToken) => 
    async (dispatch) => {
        
        const response = await axios.get("https://api.spotify.com/v1/me/top/artists", {
            params: {
                time_range: "short_term",
                limit: 50,
            },  
            headers: { "Authorization" : `Bearer ${accessToken}` }
        })

        dispatch({ type: 'GET_TOP_ARTISTS_SHORT', payload: response });
    }

// Get user's top tracks (long term)
export const get_topTracks_long = (accessToken) => 
    async (dispatch) => {
        
        const response = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
            params: {
                time_range: "long_term",
                limit: 50,
            },  
            headers: { "Authorization" : `Bearer ${accessToken}` }
        })

        dispatch({ type: 'GET_TOP_TRACKS_LONG', payload: response });
    }

// Get user's top tracks (medium term)
export const get_topTracks_medium = (accessToken) => 
    async (dispatch) => {
        
        const response = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
            params: {
                time_range: "medium_term",
                limit: 50,
            },  
            headers: { "Authorization" : `Bearer ${accessToken}` }
        })

        dispatch({ type: 'GET_TOP_TRACKS_MEDIUM', payload: response });
    }

// Get user's top tracks (short term)
export const get_topTracks_short = (accessToken) => 
    async (dispatch) => {
        
        const response = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
            params: {
                time_range: "short_term",
                limit: 50,
            },  
            headers: { "Authorization" : `Bearer ${accessToken}` }
        })

        dispatch({ type: 'GET_TOP_TRACKS_SHORT', payload: response });
    }