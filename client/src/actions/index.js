import axios from 'axios';

const headers = {};

export const get_user_info = (accessToken) =>
    async (dispatch) => {
        
        const response = await axios.get("https://api.spotify.com/v1/me", 
            { headers: {"Authorization" : `Bearer ${accessToken}`} })

        dispatch({ type: 'GET_USER_INFO', payload: response });
    }
