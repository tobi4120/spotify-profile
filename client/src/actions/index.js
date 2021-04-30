import axios from 'axios';

const headers = {};

export const login = () =>
    async (dispatch) => {
        const response = await axios.get(`https://accounts.spotify.com/authorize?client_id=71a31a9286b54db9839fd01a9d059ae1
        &response_type=code&redirect_uri=http://localhost:3000/`, null, {headers: headers})

        dispatch({ type: 'LOGIN', payload: response });
    }
