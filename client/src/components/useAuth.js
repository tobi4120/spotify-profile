import { useState, useEffect } from "react"
import axios from "axios"

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    useEffect(async () => {

        axios.post("http://localhost:3001/login", {
            code,
        })
        .then(res => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)

            // Put access token in local storage and clear code in URL
            localStorage.setItem("token", res.data.refreshToken)
            window.history.pushState({}, null, "/")
        })
        .catch(() => {
            window.location = "/"
            localStorage.clear();
        })
    
    }, [code])

    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
        axios
            .post("http://localhost:3001/refresh", {
                refreshToken,
            })
            .then(res => {
                setAccessToken(res.data.accessToken)
                setExpiresIn(res.data.expiresIn)
            })
            .catch(() => {
                window.location = "/"
                localStorage.clear();
            })
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

  return accessToken
}