import React, { useEffect, useState } from "react";
import useAuth from '../../useAuth';
import Loader from "../loader";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { get_topArtists_long, get_topArtists_medium, get_topArtists_short } from "../../../actions/index";

function TopArtists(props) {
    const accessToken = useAuth(props.code)
    const [isLoading, set_isLoading] = useState(true);
    const [term, set_term] = useState("long_term")

    useEffect(() => {

        if (!accessToken) return

        // Get the user's top artists in the long, medium, and short term from Spotify API
        const fetchData = async () => {

            // Long term
            await props.get_topArtists_long(accessToken);

            // Medium term
            await props.get_topArtists_medium(accessToken);

            // Short term
            await props.get_topArtists_short(accessToken);

            set_isLoading(false);
        }

        fetchData();

    }, [accessToken]);

    if (isLoading) return <Loader />

    return (
        <div className="top-artists">
            <h1 className="heading-primary">Top Artists</h1>

            <div className="top-artists__toggle-btns">
                <button onClick={() => set_term("long_term")}>All Time</button>
                <button onClick={() => set_term("medium_term")}>Last 6 Months</button>
                <button onClick={() => set_term("short_term")}>Last 4 Weeks</button>
            </div>

            <ul className="top-artists__artists">
                {term === "long_term"? props.top_artists.long.items.map(artist => {
                    return <li key={artist.id}><Link to={`top-artists/${artist.id}`}>{artist.name}</Link></li>
                }): 
                term === "medium_term"? props.top_artists.medium.items.map(artist => {
                    return <li key={artist.id}><Link to={`top-artists/${artist.id}`}>{artist.name}</Link></li>
                }):
                term === "short_term"? props.top_artists.short.items.map(artist => {
                    return <li key={artist.id}><Link to={`top-artists/${artist.id}`}>{artist.name}</Link></li>
                }): null}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        top_artists: state.top_artists,
    }
}

export default connect(mapStateToProps, {
    get_topArtists_long,
    get_topArtists_medium,
    get_topArtists_short
})(TopArtists);