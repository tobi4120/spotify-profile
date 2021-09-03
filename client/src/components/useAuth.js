import { useState, useEffect } from "react"
import axios from "axios"
require('dotenv').config();

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();
    const [tokenTimestamp, setTokenTimestamp] = useState();

    const WEB_URL = process.env.REACT_APP_WEB_URL || "https://my-spotifyprofile.herokuapp.com/";

    useEffect(() => {

        // If there is an access token in local storage, it means that a user is logged in, so no need to call the /login API
        if (localStorage.getItem("access_token")) {

            // Get the data from local storage and put it into variables
            setAccessToken(localStorage.getItem("access_token"))
            setRefreshToken(localStorage.getItem("refresh_token"))
            setExpiresIn(localStorage.getItem("expires_in"))
            setTokenTimestamp(localStorage.getItem("token_timestamp"))

            return accessToken
        }

        // Get access token from Spotify API
        const fetchData = async () => {
            axios.post(`${WEB_URL}login`, {
            code,
            })
            .then(res => {

                // Put the returned data into variables
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setExpiresIn(res.data.expiresIn)
                setTokenTimestamp(new Date().getTime())

                // Put the returned data in local storage and clear code in URL
                localStorage.setItem("access_token", res.data.accessToken)
                localStorage.setItem("refresh_token", res.data.refreshToken)
                localStorage.setItem("expires_in", res.data.expiresIn)
                localStorage.setItem("token_timestamp", new Date().getTime())

                window.history.pushState({}, null, "/")
            })
            .catch(() => {
                window.location = "/"
                localStorage.clear();
            })
        }
        fetchData();
        
    }, [code])

    useEffect(() => {
        if (!refreshToken || !expiresIn || !tokenTimestamp) return

        // Check to see if the access token is expired (if the current time is greater than an hour after the token was issued)
        if (parseInt(new Date().getTime()) > (parseInt(tokenTimestamp) + (3600 * 1000))) {

            // Refresh access token
            axios
            .post(`${WEB_URL}refresh`, {
                refreshToken,
            })
            .then(res => {

                // Put the new access token and timestamp into variables and onto local storage
                setAccessToken(res.data.accessToken)
                setTokenTimestamp(new Date().getTime())

                localStorage.setItem("access_token", res.data.accessToken)
                localStorage.setItem("token_timestamp", new Date().getTime())
            })
            .catch(() => {
                window.location = "/"
                localStorage.clear();
            })
        }

    }, [refreshToken])

  return accessToken
}