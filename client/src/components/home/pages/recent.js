import { useEffect, useState } from "react";
import useAuth from "../../useAuth";
import Loader from "../loader";
import axios from "axios";
import TrackRow from "../page_elements/track_row";

export default function Recent(props) {
    const accessToken = useAuth(props.code)
    const [isLoading, set_isLoading] = useState(true)
    const [recentTracks, set_recentTracks] = useState()

    useEffect(() => {
        if (!accessToken) return;

        fetchRecent();
    }, [accessToken]);

    const fetchRecent = async () => {
        const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
            headers: { "Authorization" : `Bearer ${accessToken}` }
        });

        set_recentTracks(response.data.items);
        set_isLoading(false);

        console.log(response.data.items);
    };

    if (isLoading) return <Loader />;

    return (
        <div className="recent-tracks">
            <h1 className="recent-tracks__heading heading-secondary">Recent Tracks</h1>

            <div className="recent-tracks__tracklist">
                {recentTracks.map((track, index) => {
                    return (
                        <TrackRow key={index} track={track.track} />
                    )
                })}
            </div>
        </div>
    );
}