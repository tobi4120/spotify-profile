import React, { useEffect, useState } from "react";
import useAuth from '../useAuth';

import { connect } from 'react-redux';
import { get_user_info, get_playlists, get_following, 
    get_topArtists_long, get_topTracks_long } from "../../actions";

function Home(props) {
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

    // Convert milliseconds to mm:ss format
    const convert_mil = (milliseconds, name) => {

        let minutes = Math.floor(milliseconds/60000)
        let seconds = Math.round((milliseconds%60000)/1000)

        if (seconds < 10) {
            seconds = `0${seconds}`
        }

        return `${minutes}:${seconds}`
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="home">

            {/* Header */}
            <div className="home__header">
                <a className="home__header__username" href={props.current_user.external_urls.spotify}>
                    <h1>{props.current_user.display_name}</h1>
                </a>

                <div className="home__header__account-stats">
                    <span>{props.current_user.followers.total}</span>
                    <p>Followers</p>

                    <span>{props.following.artists.total}</span>
                    <p>Following</p>

                    <span>{props.playlists.total}</span>
                    <p>Playlists</p>
                </div>
            </div>

            {/* Body */}           
            <div className="home__body">

                {/* Top Artists */} 
                <div className="home__body__top-artists">
                    <div className="home__body__top-artists__header">
                        <h2>Top Artists of All Time</h2>
                        <a href="#">See more</a>
                    </div>

                    <ul className="home__body__top-artists__list">
                        {props.top_artists.long.items.slice(0, 10).map((artist) => {
                            return (    
                                <li className="home__body__top-artists__list__artist" key={artist.id}>
                                    {artist.images[0] && <img src={artist.images[0].url} />}
                                    <p>{artist.name}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                {/* Top Tracks */} 
                <div className="home__body__top-tracks">
                    <div className="home__body__top-tracks__header">
                        <h2>Top Tracks of All Time</h2>
                        <a href="#">See more</a>
                    </div>

                    <ul className="home__body__top-tracks__list">
                        {props.top_tracks.long.items.slice(0, 10).map((track) => {
                            return (    
                                <li className="home__body__top-tracks__list__track" key={track.id}>
                                    {track.album.images[0] && <img src={track.album.images[0].url} />}
                                    <p className="track-name">{track.name}</p>
                                    <p className="artist-name">{track.artists[0].name}</p>
                                    <p className="album-name">{track.album.name}</p>
                                    <p className="duration">{convert_mil(track.duration_ms, track.name)}</p>
                                </li>
                            )
                        })}
                    </ul>
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
})(Home);