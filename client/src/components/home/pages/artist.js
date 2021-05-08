import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../useAuth";
import Loader from "../loader";

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

        console.log(response.data.artists[0])
    }

    if (isLoading) return <Loader />

    if (error || !artist) return <div>Artist not found!</div>

    return (
        <div>
            Hello, world
        </div>
    )
}
