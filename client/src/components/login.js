import React from "react";

function Login(props) {
    return (
        <div>
            <h1>Spotify Profile</h1>
            <a href="https://accounts.spotify.com/authorize?client_id=71a31a9286b54db9839fd01a9d059ae1&response_type=code&redirect_uri=http://localhost:3000/&scope=user-read-recently-played%20user-top-read%20playlist-read-private%20user-library-read%20user-follow-read%20user-read-email"
            >Log In To Spotify</a>
        </div>
    )
}
export default Login;