import React, { useEffect, useState } from "react";
import useAuth from '../../useAuth';
import Loader from "../loader";
import { connect } from "react-redux";
import { get_topArtists_long, get_topArtists_medium, get_topArtists_short } from "../../../actions/index";
import ArtistIcon from "../page_elements/artist-icon";
import ToggleBts from "../page_elements/toggle_buttons";

function TopArtists(props) {
    const accessToken = useAuth(props.code)
    const [isLoading, set_isLoading] = useState(true);
    const [term, set_term] = useState("long_term")

    useEffect(() => {
        if (!accessToken) return
        fetchData();

    }, [accessToken]);

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

    if (isLoading) return <Loader />

    return (
        <div className="top-artists page-body">

            <div className="top-header">
                <h1 className="heading-secondary">Top Artists</h1>
                <ToggleBts term={term} set_term={set_term} />
            </div>

            <ul className="top-artists__artists">
                {term === "long_term"? props.top_artists.long.items.map(artist => {
                    return (
                        <ArtistIcon key={artist.id} artist={artist} />
                    )
                }): 
                term === "medium_term"? props.top_artists.medium.items.map(artist => {
                    return (
                        <ArtistIcon key={artist.id} artist={artist} />
                    )
                }):
                term === "short_term"? props.top_artists.short.items.map(artist => {
                    return (
                        <ArtistIcon key={artist.id} artist={artist} />
                    )
                }): null}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { top_artists: state.top_artists }
}

export default connect(mapStateToProps, {
    get_topArtists_long,
    get_topArtists_medium,
    get_topArtists_short
})(TopArtists);