import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import useAuth from '../../useAuth';
import Loader from "../loader";
import { Link } from "react-router-dom"
import { get_topTracks_long, get_topTracks_medium, get_topTracks_short} from "../../../actions";
import TrackRow from "../page_elements/track_row";

function TopTracks(props) {
    const accessToken = useAuth(props.code);
    const [isLoading, set_isLoading] = useState(true);
    const [term, set_term] = useState("long_term")

    useEffect(() => {
        if (!accessToken) return
        fetchData();

    }, [accessToken])

     // Get the user's top tracks in the long, medium, and short term from Spotify API
     const fetchData = async () => {

        // Long term
        await props.get_topTracks_long(accessToken);

        // Medium term
        await props.get_topTracks_medium(accessToken);

        // Short term
        await props.get_topTracks_short(accessToken);

        set_isLoading(false);
    }

    if (isLoading) return <Loader />

    return (
        <div className="top-tracks">
            <h1 className="heading-secondary">Top Tracks</h1>

            <div className="top-tracks__toggle-btns">
                <button onClick={() => set_term("long_term")}>All Time</button>
                <button onClick={() => set_term("medium_term")}>Last 6 Months</button>
                <button onClick={() => set_term("short_term")}>Last 4 Weeks</button>
            </div>

            <div className="top-tracks__tracklist">
                {term === "long_term"? props.top_tracks.long.items.map((track, index) => {
                    return <TrackRow key={index} track={track} />
                }): 
                term === "medium_term"? props.top_tracks.medium.items.map((track, index) => {
                    return <TrackRow key={index} track={track} />
                }):
                term === "short_term"? props.top_tracks.short.items.map((track, index) => {
                    return <TrackRow key={index} track={track} />
                }): null}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { top_tracks: state.top_tracks }
}

export default connect(mapStateToProps, {
    get_topTracks_long,
    get_topTracks_medium,
    get_topTracks_short
})(TopTracks)