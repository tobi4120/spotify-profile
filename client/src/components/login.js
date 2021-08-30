import React from "react";

// show_dialog=true

function Login() {
    return (
        <div className="login-page">
            <div className="contents">
                <h1 className="heading-primary">Spotify Profile</h1>
                <a className="btn-secondary" href="https://accounts.spotify.com/authorize?client_id=71a31a9286b54db9839fd01a9d059ae1&response_type=code&redirect_uri=http://localhost:3000/&scope=user-read-recently-played%20user-top-read%20playlist-read-private%20user-library-read%20user-follow-read%20user-read-email"
                >Log In To Spotify</a>
            </div>
        </div>
    )
}
export default Login;