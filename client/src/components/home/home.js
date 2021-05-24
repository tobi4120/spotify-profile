import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Menu from "./menu";
import Profile from "./pages/profile";
import TopArtists from "./pages/top_artists";
import Artist from "./pages/artist";
import TopTracks from "./pages/top_tracks";
import Track from "./pages/track";
import Recent from "./pages/recent";
import Playlists from "./pages/playlists";
import Playlist from "./pages/playlist";
import Reccomendations from "./pages/reccomendations";

function Home(props) {
    const code = props.code

    return (
        <div className="home">
            <Menu />

            <div className="home__dashboard">
                <Router>
                    <Switch>
                        <Route path="/" exact render={(props) => (
                            <Profile {...props} code={code} />
                        )} />
                        <Route path="/top-artists" exact render={(props) => (
                            <TopArtists {...props} code={code} />
                        )} />
                        <Route path="/artist/:id" render={(props) => (
                            <Artist {...props} code={code} />
                        )} />
                        <Route path="/top-tracks" exact render={(props) => (
                            <TopTracks {...props} code={code} />
                        )} />
                        <Route path="/track/:id" render={(props) => (
                            <Track {...props} code={code} />
                        )} />
                        <Route path="/recent" exact render={(props) => (
                            <Recent {...props} code={code} />
                        )} />
                        <Route path="/playlists" exact render={(props) => (
                            <Playlists {...props} code={code} />
                        )} />
                        <Route path="/playlist/:id" render={(props) => (
                            <Playlist {...props} code={code} />
                        )} />
                        <Route path="/reccomendations/:id" render={(props) => (
                            <Reccomendations {...props} code={code} />
                        )} />
                    </Switch>
                </Router>
            </div>
        </div>
    )
}

export default Home;