// Convert milliseconds to mm:ss format
export const convert_mil = (milliseconds) => {

    let minutes = Math.floor(milliseconds/60000)
    let seconds = Math.round((milliseconds%60000)/1000)

    if (seconds < 10) {
        seconds = `0${seconds}`
    }

    // Coverting 4:60 to 5:00 for example
    if (seconds === 60) {
        seconds = "00"
        minutes++
    }
    return `${minutes}:${seconds}`
}

// Put a bunch of track ids into a comma seperated string
export const tracks_in_string = (tracks) => {
    let tracks_string = "";
    let count = 0

    for (const track of tracks) {

        // Append to string
        tracks_string += track.track.id 

        // Add comma to string
        if (count !== tracks.length - 1) {
            tracks_string += ','
        }

        // Increment counter
        count++
    }

    return tracks_string
}

// Get the average features for a list of tracks 
export const get_avg_features = (tracks) => {
    let acousticness = 0;
    let danceability = 0;
    let energy = 0;
    let instrumentalness = 0;
    let liveness = 0;
    let speechiness = 0;
    let valence = 0;

    if (tracks.length > 1) {
        for (const track of tracks) {
            acousticness += track.acousticness
            danceability += track.danceability
            energy += track.energy
            instrumentalness += track.instrumentalness
            liveness += track.liveness
            speechiness += track.speechiness
            valence += track.valence
        }
    
        acousticness = acousticness/tracks.length
        danceability = danceability/tracks.length
        energy = energy/tracks.length
        instrumentalness = instrumentalness/tracks.length
        liveness = liveness/tracks.length
        speechiness = speechiness/tracks.length
        valence = valence/tracks.length
    }

    return { acousticness, danceability, energy, instrumentalness, liveness, speechiness, valence }
}