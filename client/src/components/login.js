import React from "react";
require('dotenv').config();

// show_dialog=true

function Login() {
    const WEB_URL = process.env.REACT_APP_WEB_URL || "https://my-spotifyprofile.herokuapp.com/";

    return (
        <div className="login-page">
            <div className="contents">
                <h1 className="heading-primary">Spotify Profile</h1>
                <a className="btn-secondary" href={`https://accounts.spotify.com/authorize?client_id=71a31a9286b54db9839fd01a9d059ae1&response_type=code&redirect_uri=${WEB_URL}&scope=user-read-recently-played%20user-top-read%20playlist-read-private%20user-library-read%20user-follow-read%20user-read-email&show_dialog=true`}
                >Log In To Spotify</a>
            </div>
        </div>
    )
}
export default Login;