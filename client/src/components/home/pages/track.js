import React, { useEffect, useState } from "react";
import useAuth from "../../useAuth";
import Loader from "../loader";
import axios from "axios";
import { Bar } from "react-chartjs-2";

export default function Track(props) {
    const accessToken = useAuth(props.code)
    const [isLoading, set_isLoading] = useState(true)
    const [track, set_track] = useState({})
    const [error, set_error] = useState(false)

    const keys = {0: 'C', 1: 'D♭', 2: 'D', 3: 'E♭', 4: 'E', 5: 'F', 6: 'G♭', 7: 'G', 8: 'A♭', 9: 'A', 10: 'B♭', 11: 'B'}

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

        // Parse through features response and put the necessary data in an array called features
        const features = { 
            "acousticness": features_response.data.acousticness, 
            "danceability":  features_response.data.danceability,
            "energy":  features_response.data.energy,
            "instrumentalness":  features_response.data.instrumentalness,
            "liveness":  features_response.data.liveness,
            "speechiness":  features_response.data.speechiness,
            "valence":  features_response.data.valence,
        }

        // If no track, then return
        if (!general_response) return
        
        // Put responses in track variable
        set_track({...track, general: general_response.data, analysis: analysis_response.data, features: features })

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
                                <p className="track-page__track-data">
                                    {/* Track minutes */}
                                    {Math.floor(track.analysis.track.duration / 60)}:

                                    {/* Track seconds */}
                                    {Math.round(track.analysis.track.duration % 60).toLocaleString('en-US', {
                                        minimumIntegerDigits: 2,
                                    })}
                                </p>
                                <p className="track-page__label">Duration</p>
                            </td>
                            <td>
                                <p className="track-page__track-data">{keys[`${track.analysis.track.key}`]}</p>
                                <p className="track-page__label">Key</p>
                            </td>
                            <td>
                                <p className="track-page__track-data">{track.analysis.track.mode === 1? 'Major': 'Minor'}</p>
                                <p className="track-page__label">Modality</p>
                            </td>
                            <td>
                                <p className="track-page__track-data">{track.analysis.track.time_signature}</p>
                                <p className="track-page__label">Time Signature</p>
                            </td>
                            <td>
                                <p className="track-page__track-data">{Math.round(track.analysis.track.tempo)}</p>
                                <p className="track-page__label">Tempo (BPM)</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className="track-page__track-data">{track.general.popularity}%</p>
                                <p className="track-page__label">Popularity</p>
                            </td>
                            <td>
                                <p className="track-page__track-data">{track.analysis.bars.length}</p>
                                <p className="track-page__label">Bars</p>
                            </td>
                            <td>
                                <p className="track-page__track-data">{track.analysis.beats.length}</p>
                                <p className="track-page__label">Beats</p>
                            </td>
                            <td>
                                <p className="track-page__track-data">{track.analysis.sections.length}</p>
                                <p className="track-page__label">Sections</p>
                            </td>
                            <td>
                                <p className="track-page__track-data">{track.analysis.segments.length}</p>
                                <p className="track-page__label">Segments</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Audio Features */}
            <div className="track-page__features">

                <h2>Audio Features</h2>

                <Bar 
                    data = {{
                        labels: Object.keys(track.features),
                        datasets: [{
                            label: 'Features',
                            data: Object.values(track.features),
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
                />
            </div>
        </div>
    )
}