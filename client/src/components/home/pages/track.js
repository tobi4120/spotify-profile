import React, { useEffect, useState } from "react";
import useAuth from "../../useAuth";
import Loader from "../loader";
import axios from "axios";

export default function Track(props) {
    const accessToken = useAuth(props.code)
    const [isLoading, set_isLoading] = useState(true)
    const [track, set_track] = useState({})
    const [error, set_error] = useState(false)

    useEffect(() => {
        if (!accessToken) return

        get_track(props.match.params.id)
    }, [accessToken])

    const get_track = async (track_id) => {

        // Get general info about the track
        const general_response = await axios.get(`https://api.spotify.com/v1/tracks/${track_id}`, {
            headers: { "Authorization" : `Bearer ${accessToken}` }
        })
        .catch(() => {
            set_error(true)
            set_isLoading(false)
        })

        // Get audio analysis about the track
        const analysis_response = await axios.get(`https://api.spotify.com/v1/audio-analysis/${track_id}`, {
            headers: { "Authorization" : `Bearer ${accessToken}` }
        })
        .catch(() => {
            set_error(true)
            set_isLoading(false)
        })

        // Get audio features for the track
        const features_response = await axios.get(`https://api.spotify.com/v1/audio-features/${track_id}`, {
            headers: { "Authorization" : `Bearer ${accessToken}` }
        })
        .catch(() => {
            set_error(true)
            set_isLoading(false)
        })

        // If no track, then return
        if (!general_response) return
        
        // Put responses in track variable
        set_track({...track, general: general_response.data, analysis: analysis_response.data, features: features_response.data })

        set_isLoading(false)
    }

    console.log(track)

    if (isLoading) return <Loader />

    if (error || !track) return <div>Artist not found!</div>

    return (
        <div className="track-page">
            {track.general.album.images[0]?
                <img src={track.general.album.images[0].url}/>:
                <p>Image not found!</p>
            }

            {/* General Info */}
            <div className="track-page__general-info">
                <h1>{track.general.name}</h1>
                <h2>{track.general.artists[0].name}</h2>
                <p>{track.general.album.name} &middot; {(track.general.album.release_date).slice(0, 4)}</p>

                <a href={track.general.external_urls.spotify}>Play on Spotify</a>
            </div>

            {/* Track analysis */}
            <div className="track-page__analysis">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <p>
                                    {/* Track minutes */}
                                    {Math.floor(track.analysis.track.duration / 60)}:

                                    {/* Track seconds */}
                                    {Math.round(track.analysis.track.duration % 60).toLocaleString('en-US', {
                                        minimumIntegerDigits: 2,
                                    })}
                                </p>
                                <p>Duration</p>
                            </td>
                            <td>
                                
                            </td>
                            <td>
                                
                            </td>
                            <td>
                                
                            </td>
                            <td>
                                
                            </td>
                        </tr>
                        <tr>
                            <td>

                            </td>
                            <td>
                                
                            </td>
                            <td>
                                
                            </td>
                            <td>
                                
                            </td>
                            <td>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}