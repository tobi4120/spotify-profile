import { useEffect, useState } from "react";
import useAuth from "../../useAuth";
import Loader from "../loader";
import axios from "axios";

export default function Playlists(props) {
    const accessToken = useAuth(props.code);
    const [isLoading, set_isLoading] = useState(true);
    const [playlists, set_playlists] = useState();

    useEffect(() => {
        fetchData();
    }, [accessToken])

    const fetchData = async () => {
        const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
            headers: { "Authorization" : `Bearer ${accessToken}` }
        })
        set_playlists(response.data.items)
        set_isLoading(false);
    }

    if (isLoading) return <Loader />

    return (
        <div>
            <h1 className="heading-secondary heading-playlists">Your Playlists</h1>
                <div className="playlists">
                {playlists.map(playlist => {
                    return (
                        <div className="playlist" key={playlist.id}>
                            <a href={`playlist/${playlist.id}`}> 
                                <img className="playlist__img" src={playlist.images[0] && playlist.images[0].url} />
                                <p className="playlist__name paragraph">{playlist.name}</p>
                                <p className="playlist__track-count">{playlist.tracks.total} TRACKS</p>
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}