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