import React, { useEffect, useState } from "react";
import useAuth from '../../useAuth';
import Loader from "../loader";
import TrackRow from "../page_elements/track_row";
import InfoIcon from "../page_elements/info-icon";
import UserIcon from "../page_elements/user-icon";

import { connect } from 'react-redux';
import { get_user_info, get_playlists, get_following, 
    get_topArtists_long, get_topTracks_long } from "../../../actions";

function Profile(props) {
    const [isLoading, set_isLoading] = useState(true);

    // Get access token (used to make requests to Spotify API)
    const accessToken = useAuth(props.code)

    useEffect(() => {

        if (!accessToken) return

        // Get user data from Spotify API
        const fetchData = async () => {

            // Get basic user info (i.e name, email, followers)
            await props.get_user_info(accessToken);

            // Get the artists that the user follows
            await props.get_following(accessToken);

            // Get user playlists
            await props.get_playlists(accessToken);

            // Get the user's top playlists (long term)
            await props.get_topArtists_long(accessToken);

            // Get the user's top tracks (long term)
            await props.get_topTracks_long(accessToken)

            set_isLoading(false);
        }
        
        // Call the fetch data function above
        fetchData();

    }, [accessToken]) 

    // Logout
    const logout = () => {

        localStorage.clear();
        window.location = "/"
    }

    if (isLoading) return <Loader />

    return (
        <div className="profile">

            {/* Header */}
            <div className="profile__header">
                <UserIcon />
                <h1 className="heading-primary">
                    <a className="profile__header__username" href={props.current_user.external_urls.spotify}>{props.current_user.display_name}</a>
                </h1>

                <div className="profile__header__account-stats">
                    <div className="stats">
                        <div className="stat">
                            <span>{props.current_user.followers.total}</span>
                            <p>Followers</p>
                        </div>

                        <div className="stat">
                            <span>{props.following.artists.total}</span>
                            <p>Following</p>
                        </div>

                        <div className="stat">
                            <span>{props.playlists.total}</span>
                            <p>Playlists</p>
                        </div>
                    </div>
                </div>
                            
                <button className="logout btn-primary" onClick={() => logout()}>Logout</button>
            </div>

            {/* Body */}           
            <div className="profile__body">

                {/* Top Artists */} 
                <div className="profile__body__top-artists">
                    <div className="profile__body__header">
                        <h2 className="heading-tertiary">Top Artists of All Time</h2>
                        <a className="btn-primary body-btn" href="/top-artists">See more</a>
                    </div>

                    <ul className="profile__body__top-artists__list">
                        {props.top_artists.long.items.slice(0, 10).map((artist) => {
                            return (    
                                <li className="row" key={artist.id}>
                                    <a href={`/artist/${artist.id}`}>
                                        <div className="row__img">
                                            <InfoIcon />
                                            {artist.images[0] && <img src={artist.images[0].url} />}
                                        </div>
                                        <p className="paragraph">{artist.name}</p>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                {/* Top Tracks */} 
                <div className="profile__body__top-tracks">
                    <div className="profile__body__header">
                        <h2 className="heading-tertiary">Top Tracks of All Time</h2>
                        <a className="btn-primary body-btn" href="/top-tracks">See more</a>
                    </div>

                    <div className="profile__body__top-tracks__tracklist">
                        {props.top_tracks.long.items.slice(0, 10).map((track, index) => {
                            return (    
                                <TrackRow key={index} track={track} />
                            )
                        })}
                    </div>
                </div>
                
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        current_user: state.current_user, 
        playlists: state.playlists,
        following: state.following,
        top_artists: state.top_artists,
        top_tracks: state.top_tracks,
    }
}

export default connect(mapStateToProps, {
    get_user_info,
    get_playlists,
    get_following,
    get_topArtists_long,
    get_topTracks_long
})(Profile);