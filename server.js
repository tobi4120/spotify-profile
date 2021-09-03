const express = require("express");
const cors = require("cors")
const SpotifyWebAPI = require('spotify-web-api-node')
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors())
app.use(express.json())

const HEROKU_URL = process.env.HEROKU_URL || 'http://localhost:3000/';
const CLIENT_ID =  process.env.CLIENT_ID || process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET || process.env.REACT_APP_CLIENT_SECRET

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });
}

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyAPI = new SpotifyWebAPI({
        redirectUri: HEROKU_URL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET
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
        redirectUri: HEROKU_URL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
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

app.listen(process.env.PORT || 3001)