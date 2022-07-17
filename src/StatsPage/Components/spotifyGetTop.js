import axios from 'axios'

async function spotifyGetTop(type, time_range) {
    console.log("In get top")
    var data = null
    var url = "https://api.spotify.com/v1/me/top/" + type
    if (localStorage.getItem(type + "_data") !== null) {
        const howManyHours = checkHowManyTimeSinceLastUpdateInHour(type)
        console.log("How many hours since last refresh =>", howManyHours)
        if (howManyHours < 12 && howManyHours !== -1) {
            return JSON.parse(localStorage.getItem(type + "_data"))
        }
    }
    console.log("Before api call")
    await axios.get(url, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("access_token"),
        },
        params: {
            time_range: time_range
        }
    })
        .then(response => {
            console.log("Response =>", response)
            if (response.status === 200) {
                data = response.data.items
                localStorage.setItem(type + "_data", JSON.stringify(data))
                localStorage.setItem(type + "_last_save", new Date().toString())
            }
        })
        .catch(e => {
            console.log(e)
        })
    return(data)
}

function checkHowManyTimeSinceLastUpdateInHour(type) {
    if (localStorage.getItem(type + "_last_save") === null)
        return -1
    var dateNow = new Date()
    var lastSaveDate = Date.parse(localStorage.getItem(type + "_last_save"))
    var diffTime = Math.abs(dateNow - lastSaveDate);
    diffTime = diffTime / (1000 * 60 * 60)
    return diffTime
}

export default spotifyGetTop