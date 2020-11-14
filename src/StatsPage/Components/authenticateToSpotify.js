import axios from "axios";
import qs from "querystring";

async function authenticateToSpotify(code, handler) {
    var auth = new Buffer.from(process.env.REACT_APP_SPOTIFY_CLIENT_ID + ':' +  process.env.REACT_APP_SPOTIFY_CLIENT_SECRET).toString('base64')
    const config = {
        headers: {
            'Authorization': 'Basic ' + auth,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }
    const rqBody = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT,
    }
    var url = "https://accounts.spotify.com/api/token"
    await axios.post(url, qs.stringify(rqBody), config)
        .then(response => {
            //TODO store date when access_token expires
            localStorage.setItem("access_token", response.data.access_token)
            localStorage.setItem("refresh_token", response.data.refresh_token)
            handler()
        }).catch(e=> {
        });
}

export default authenticateToSpotify