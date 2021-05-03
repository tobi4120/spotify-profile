const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser")
const SpotifyWebAPI = require('spotify-web-api-node')

const app = express();
app.use(cors())
app.use(bodyParser.json())

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyAPI = new SpotifyWebAPI({
        redirectUri: 'http://localhost:3000/',
        clientId: '71a31a9286b54db9839fd01a9d059ae1',
        clientSecret: '9357e63c9ed04557be2f8325eb07d0a4'
    })

    spotifyAPI.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyAPI = new SpotifyWebAPI({
        redirectUri: 'http://localhost:3000/',
        clientId: '71a31a9286b54db9839fd01a9d059ae1',
        clientSecret: '9357e63c9ed04557be2f8325eb07d0a4',
        refreshToken
    })

    spotifyAPI
        .refreshAccessToken()
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in
            })
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
})

app.listen(3001)