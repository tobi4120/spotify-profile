import React, { useEffect } from "react";
import useAuth from '../useAuth';
import axios from "axios"

function Home(props) {
    const accessToken = useAuth(props.code)

    useEffect(async () => {

        if (!accessToken) return
        
        const response = await axios.get("https://api.spotify.com/v1/me", 
            { headers: {"Authorization" : `Bearer ${accessToken}`} })

        console.log(response)
    })

    return (
        <div>
            Home
        </div>
    )
}
export default Home;