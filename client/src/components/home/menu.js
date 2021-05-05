import React from "react";

function Menu(props) {
    return (
        <div className="menu">
            <ul>
                <li><a href="/">Profile</a></li>
                <li><a href="/top-artists">Top Artists</a></li>
            </ul>
        </div>
    )
}
export default Menu;