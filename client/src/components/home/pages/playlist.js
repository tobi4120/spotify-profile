import { useEffect, useState } from "react";
import useAuth from "../../useAuth";
import Loader from "../loader";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { tracks_in_string, get_avg_features } from "../helper_functions";
import TrackRow from "../page_elements/track_row";

export default function Playlist(props) {
    const accessToken = useAuth(props.code);
    const [isLoading, set_isLoading] = useState(true);
    const [error, set_error] = useState(false);
    const [playlist, set_playlist] = useState();
    const [audio_features, set_features] = useState();

    useEffect(() => {
        if (!accessToken) return

        get_playlist(props.match.params.id)
    }, [accessToken])

    const get_playlist = async (playlist_id) => {
        let request_err = false;

        // Get the playlist
        const playlist_response = await axios.get(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
            headers: { "Authorization" : `Bearer ${accessToken}` }
        })
        .catch(() => {
            set_error(true)
            set_isLoading(false)

            request_err = true;
        })

        // Check if request error
        if (request_err) return

        // Get the audio features of the playlist's tracks
        const features_response = await axios.get("https://api.spotify.com/v1/audio-features", {
            params: {
                ids: tracks_in_string(playlist_response.data.tracks.items) // Put all the ids of the tracks into a comma seperated string 
            },
            headers: { "Authorization" : `Bearer ${accessToken}` }
        })

        // Calculate the average features for all the tracks
        set_features(get_avg_features(features_response.data.audio_features));

        // Add response to playlist variable
        set_playlist(playlist_response.data);

        // Set loading to false
        set_isLoading(false);
    }

    if (isLoading) return <Loader />
    if (error || !playlist) return <div>Playlist not found!</div>

    return (
        <div className="playlist">
            <div className="playlist__left">
                <img src={playlist.images[0] && playlist.images[0].url} />

                <a href={playlist.external_urls.spotify}><h1 className="heading-secondary">{playlist.name}</h1></a>
                <p>By {playlist.owner.display_name}</p>
                <p>{playlist.tracks.total} Tracks</p>

                <a href={`/reccomendations/${playlist.id}`}>Get Reccomendations</a>

                <div className="playlist__features">
                    <h2>Audio Features</h2>

                    <Bar 
                    data = {{
                        labels: Object.keys(audio_features),
                        datasets: [{
                            label: 'Features',
                            data: Object.values(audio_features),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    }}
                    width={80}
                    height={100}
                    options={{
                        indexAxis: 'y',
                    }}
                    legend={{
                        display: false,
                    }}
                />
                </div>
            </div>
            <div className="playlist__right">
                {playlist.tracks.items.map(track => {
                    return <TrackRow key={track.track.id} track={track.track} />
                })}
            </div>
        </div>
    )
}