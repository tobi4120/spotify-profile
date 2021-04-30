import React from "react";
import Login from "./login";
import Home from "./home/home";

const code = new URLSearchParams(window.location.search).get('code')

function App() {
    return code ? <Home code={code} />: <Login />
}
export default App;