import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../useAuth";
import Loader from "../loader";
import UserIcon from "../page_elements/user-icon"

export default function Artist(props) {
    const accessToken = useAuth(props.code)
    const [isLoading, set_isLoading] = useState(true)
    const [artist, set_artist] = useState([])
    const [error, set_error] = useState(false)

    useEffect(() => {
        if (!accessToken) return

        get_artist(props.match.params.id)
    }, [accessToken])

    const get_artist = async (artist_id) => {
        const response = await axios.get("https://api.spotify.com/v1/artists", {
            params: {
                ids: artist_id,
            },  
            headers: { "Authorization" : `Bearer ${accessToken}` }
        })
        .catch(() => {
            set_error(true)
            set_isLoading(false)
        })

        set_artist(response.data.artists[0]);
        set_isLoading(false)
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    if (isLoading) return <Loader />

    if (error || !artist) return <div>Artist not found!</div>

    return (
        <div className="artist-page">
            {artist.images[0]?
                <img className="artist-page__image" src={artist.images[0].url}/>:
                <div className="artist-page__image artist-page__user-icon"><UserIcon /></div>
            }
            <h1 className="heading-primary">{artist.name}</h1> 

            <div className="artist-page__stats">

                <div className="artist-page__stats__group">
                    <p className="artist-page__stats__stat">{numberWithCommas(artist.followers.total)}</p>
                    <h2 className="artist-page__stats__header">Followers</h2>
                </div>

                <div className="artist-page__stats__group">
                    {artist.genres.map((genre, index) => {
                        return <p className="artist-page__stats__stat genre" key={index}>{genre}</p>
                    })}
                    <h2 className="artist-page__stats__header">Genres</h2>
                </div>
                
                <div className="artist-page__stats__group">
                    <p className="artist-page__stats__stat">{artist.popularity}%</p>
                    <h2 className="artist-page__stats__header">Popularity</h2>
                </div>
            </div>
        </div>
    )
}
