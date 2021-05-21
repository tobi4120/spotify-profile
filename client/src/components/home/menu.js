import React from "react";

function Menu(props) {
    return (
        <div className="menu">
            <ul>
                <li><a href="/">Profile</a></li>
                <li><a href="/top-artists">Top Artists</a></li>
                <li><a href="/top-tracks">Top Tracks</a></li>
                <li><a href="/recent">Recent</a></li>
                <li><a href="/playlists">Playlists</a></li>
            </ul>
        </div>
    )
}
export default Menu;