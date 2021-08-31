import React, { useEffect, useState } from "react";
import useAuth from "../../useAuth";
import Loader from "../loader";
import axios from "axios";
import FeatureChart from "../page_elements/feature-chart";

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

        // Get audio features for the track
        const features_response = await axios.get(`https://api.spotify.com/v1/audio-features/${track_id}`, {
            headers: { "Authorization" : `Bearer ${accessToken}` }
        })

        // Parse through features response and put the necessary data in an object called features
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

    if (isLoading) return <Loader />

    if (error || !track) return <div>Track not found!</div>

    return (
        <div className="track-page">

            {/* General Info */}
            <div className="track-page__general-info">

                {/* Image */}
                {track.general.album.images[0]?
                    <img src={track.general.album.images[0].url}/>:
                    <p>Image not found!</p>
                }
                
                {/* Info */}
                <div className="track-page__general-info__info">
                    <h1 className="heading-primary">{track.general.name}</h1>
                    <h2 className="track-artist-name">{track.general.artists[0].name}</h2>
                    <p className="track-album-info">
                        {track.general.album.name} &middot; {(track.general.album.release_date).slice(0, 4)}
                    </p>

                    <a className="btn-secondary" href={track.general.external_urls.spotify}>Play on Spotify</a>
                </div>
            </div>

            {/* Track analysis */}
            <div className="track-page__analysis">
                <div className="track-page__analysis__table">
                    <div className="table-data">
                        <p className="track-page__analysis__table__track-data">
                            {/* Track minutes */}
                            {Math.floor(track.analysis.track.duration / 60)}:

                            {/* Track seconds */}
                            {Math.round(track.analysis.track.duration % 60).toLocaleString('en-US', {
                                minimumIntegerDigits: 2,
                            })}
                        </p>
                        <p className="track-page__analysis__table__label">Duration</p>
                    </div>
                    <div className="table-data">
                        <p className="track-page__analysis__table__track-data">{keys[`${track.analysis.track.key}`]}</p>
                        <p className="track-page__analysis__table__label">Key</p>
                    </div>
                    <div className="table-data">
                        <p className="track-page__analysis__table__track-data">{track.analysis.track.mode === 1? 'Major': 'Minor'}</p>
                        <p className="track-page__analysis__table__label">Modality</p>
                    </div>
                    <div className="table-data">
                        <p className="track-page__analysis__table__track-data">{track.analysis.track.time_signature}</p>
                        <p className="track-page__analysis__table__label">Time Signature</p>
                    </div>
                    <div className="table-data">
                        <p className="track-page__analysis__table__track-data">{Math.round(track.analysis.track.tempo)}</p>
                        <p className="track-page__analysis__table__label">Tempo (BPM)</p>
                    </div>
                    <div className="table-data">
                        <p className="track-page__analysis__table__track-data">{track.general.popularity}%</p>
                        <p className="track-page__analysis__table__label">Popularity</p>
                    </div>
                    <div className="table-data">
                        <p className="track-page__analysis__table__track-data">{track.analysis.bars.length}</p>
                        <p className="track-page__analysis__table__label">Bars</p>
                    </div>
                    <div className="table-data">
                        <p className="track-page__analysis__table__track-data">{track.analysis.beats.length}</p>
                        <p className="track-page__analysis__table__label">Beats</p>
                    </div>
                    <div className="table-data">
                        <p className="track-page__analysis__table__track-data">{track.analysis.sections.length}</p>
                        <p className="track-page__analysis__table__label">Sections</p>
                    </div>
                    <div className="table-data">
                        <p className="track-page__analysis__table__track-data">{track.analysis.segments.length}</p>
                        <p className="track-page__analysis__table__label">Segments</p>
                    </div>
                </div>
            </div>

            {/* Audio Features */}
            <div className="track-page__feature-chart">
                <FeatureChart track={track} type="bar" />
            </div>
        </div>
    )
}