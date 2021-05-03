import React from "react";
import Login from "./login";
import Home from "./home/home";

const code = new URLSearchParams(window.location.search).get('code')
const access_token = localStorage.getItem("access_token") 

function App() {
    return code || access_token ? <Home code={code} />: <Login />
}
export default App;