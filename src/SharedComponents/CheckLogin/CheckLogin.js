import Axios from "axios";

async function CheckLogin() {
        //TODO Remove the checkTokenValidity and check if token is still valid (exprire date)
        //If token not valid refresh the access token
        var token = localStorage.getItem("access_token")
        if (token === null) {
            return false
        }
        const validity = await checkTokenValidity(token)
        if (validity === true) {
            return true
        } else {
            return false
        }
}

async function checkTokenValidity(token) {
    var returnValue = null
    await Axios.get("https://api.spotify.com/v1/me", {
        headers: {
            "Authorization" : "Bearer " + token,
        }
    })
        .then(response => {
            if (response.status === 401) {
                localStorage.clear()
                returnValue = false
            } else {
                returnValue =  true
            }
        })
    return returnValue
}

export default CheckLogin