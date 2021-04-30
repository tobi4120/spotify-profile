import React from "react";
import useAuth from '../useAuth';

function Home(props) {
    const accessToken = useAuth(props.code)
    return (
        <div>
            Home
        </div>
    )
}
export default Home;