import { useEffect, useState } from "react";
import useAuth from "../../useAuth";
import Loader from "../loader";
import axios from "axios";
import { tracks_in_string, get_avg_features } from "../helper_functions";
import TrackRow from "../page_elements/track_row";
import FeatureChart from "../page_elements/feature-chart";

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
        const features_dict = {}
        features_dict.features = get_avg_features(features_response.data.audio_features);
        set_features(features_dict);

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
                <img className="playlist-img" src={playlist.images[0] && playlist.images[0].url} />

                <a href={playlist.external_urls.spotify}>
                    <h1 className="heading-secondary playlist-name">{playlist.name}</h1>
                </a>
                <p className="owner-name">By {playlist.owner.display_name}</p>
                <p className="track-count">{playlist.tracks.total} Tracks</p>

                <a className="btn-secondary" href={`/reccomendations/${playlist.id}`}>Get Reccomendations</a>

                <div className="playlist__left__features">
                    {<FeatureChart track={audio_features} type="horizontalBar" />}
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