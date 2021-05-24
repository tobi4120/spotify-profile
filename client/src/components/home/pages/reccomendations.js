import { useEffect, useState } from "react";
import useAuth from '../../useAuth';
import Loader from "../loader";
import TrackRow from "../page_elements/track_row";
import axios from "axios";

export default function Recommendations(props) {
    const accessToken = useAuth(props.code);
    const [isLoading, set_isLoading] = useState(true);
    const [reccoTracks, set_reccoTracks] = useState([]);
    const [playlistName, set_playlistName] = useState();
    const [error, set_error] = useState(false);

    useEffect(() => {
        if (!accessToken) return
        
        fetchData();
    }, [accessToken])

    const fetchData = async () => {
        let request_err = false;

        // Get information (i.e name & tracks) from playlist
        const playlist_response = await axios.get(`https://api.spotify.com/v1/playlists/${props.match.params.id}`, {
            headers: { "Authorization" : `Bearer ${accessToken}` }
        })
        .catch(() => {
            set_isLoading(false)
            request_err = true;
        })

        // Check if request error or if playlist has no tracks
        if (request_err) {
            set_error(true);
            set_isLoading(false)
            return
        }

        // Set the playlistName useState varibale to the playlist name returned from the response
        set_playlistName(playlist_response.data.name)

        // Check if playlist has no tracks 
        if (playlist_response.data.tracks.items.length === 0) {
            set_isLoading(false)
            return
        }

        // Get 5 tracks randomly from the playlist and put them in a comma seperated string
        let tracks = playlist_response.data.tracks.items;
        let tracks_string = "";
        let loop_count = 5

            // If playlist has less than 5 tracks
            if (tracks.length < 5) 
                loop_count = tracks.length

        for (let i = 0; i < loop_count; i++) {
            const rand_track = tracks.splice(Math.floor(Math.random() * tracks.length), 1)
            tracks_string += rand_track[0].track.id

            if (i !== loop_count - 1) tracks_string += ","
        }

        // Call the Spotify reccomendations API
        const recco_response = await axios.get('https://api.spotify.com/v1/recommendations', {
            params: {
                seed_tracks: tracks_string,
                seed_genres: "",
                seed_artists: "",
            },
            headers: { "Authorization" : `Bearer ${accessToken}` }
        })

        // Set the reccomended tracks useState variable to the recco_response
        set_reccoTracks(recco_response.data.tracks) 

        // Set isLoading to false to indicate that the page has finished loading
        set_isLoading(false)
    }

    if (isLoading) return <Loader />

    if (error) return <div>Playlist not found!</div>

    return (
        <div className="reccomendations">
            <h1 className="heading-secondary">Recommended Tracks Based On {playlistName}</h1>
            <button>Save to Spotify</button>
            
            {reccoTracks.map(track => {
                return <TrackRow key={track.id} track={track}/>
            })}
        </div>
    )
}