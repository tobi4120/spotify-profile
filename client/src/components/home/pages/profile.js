import React, { useEffect, useState } from "react";
import useAuth from '../../useAuth';
import Loader from "../loader";
import TrackRow from "../page_elements/track_row";

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
                <svg className="profile__header__user-icon" viewBox="0 0 1024 1024"><path d="m730.06 679.64q-45.377 53.444-101.84 83.443t-120 29.999q-64.032 0-120.75-30.503t-102.6-84.451q-40.335 13.109-77.645 29.747t-53.948 26.722l-17.142 10.084q-29.747 19.159-51.175 57.729t-21.428 73.107 25.461 59.242 60.754 24.705h716.95q35.293 0 60.754-24.705t25.461-59.242-21.428-72.603-51.679-57.225q-6.554-4.033-18.907-10.84t-51.427-24.453-79.409-30.755zm-221.84 25.72q-34.285 0-67.561-14.873t-60.754-40.335-51.175-60.502-40.083-75.124-25.461-84.451-9.075-87.728q0-64.032 19.915-116.22t54.452-85.964 80.67-51.931 99.072-18.151 99.072 18.151 80.67 51.931 54.452 85.964 19.915 116.22q0 65.04-20.167 130.58t-53.948 116.72-81.426 83.443-98.568 32.268z"></path></svg>
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
                                            <svg className="info-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 45.999 45.999" xmlSpace="preserve"><path d="M39.264,6.736c-8.982-8.981-23.545-8.982-32.528,0c-8.982,8.982-8.981,23.545,0,32.528c8.982,8.98,23.545,8.981,32.528,0 C48.245,30.281,48.244,15.719,39.264,6.736z M25.999,33c0,1.657-1.343,3-3,3s-3-1.343-3-3V21c0-1.657,1.343-3,3-3s3,1.343,3,3V33z M22.946,15.872c-1.728,0-2.88-1.224-2.844-2.735c-0.036-1.584,1.116-2.771,2.879-2.771c1.764,0,2.88,1.188,2.917,2.771 C25.897,14.648,24.746,15.872,22.946,15.872z"></path></svg>
                                            {artist.images[0] && <img src={artist.images[0].url} />}
                                        </div>
                                        <p className="row__name">{artist.name}</p>
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