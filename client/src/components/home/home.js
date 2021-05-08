import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Menu from "./menu";
import Profile from "./pages/profile";
import TopArtists from "./pages/top_artists";
import Artist from "./pages/artist";
import TopTracks from "./pages/top_tracks";

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
                        <Route path="/top-artists/:id" render={(props) => (
                            <Artist {...props} code={code} />
                        )} />
                        <Route path="/top-tracks" exact render={(props) => (
                            <TopTracks {...props} code={code} />
                        )} />
                    </Switch>
                </Router>
            </div>
        </div>
    )
}

export default Home;