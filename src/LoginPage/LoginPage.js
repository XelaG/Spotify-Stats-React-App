import React from 'react';
import {Component} from 'react'
import ToSingInTheCarCover from "../assets/Songs-to-Sing-in-the-Car.jpg"
import Global50Cover from "../assets/Global-Top-50.jpg"
import RapCaviarCover from "../assets/RapCaviar.jpg"
import IconButton from "../SharedComponents/IconButton/IconButton";
import {faSpotify} from "@fortawesome/free-brands-svg-icons";
import "./LoginPage.css"
import {Redirect} from "react-router";
import CheckLogin from "../SharedComponents/CheckLogin/CheckLogin";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            redirectToSpotify: false,
        }
    }

    async componentDidMount() {
        var loggedIn = await CheckLogin()
        this.setState({isLoggedIn: loggedIn})
    }

    login = () => {
        this.setState({redirectToSpotify: true})
    }

    render() { 
        return (
            <div className="login-page-container">
                {this.state.isLoggedIn ? <Redirect to={"/stats"} /> : null}
                {this.state.redirectToSpotify ? <Redirect to={"/login"} />: null }
                <div className="login-page-container-left">
                    <img className="login-page-image-center" src={RapCaviarCover} alt="RapCaviar Spotify Playlist Cover Art"/>
                    <img className="login-page-image-top" src={Global50Cover} alt="Global Top 50 Spotify Playlist Cover Art"/>
                    <img className="login-page-image-bottom" src={ToSingInTheCarCover} alt="Song to sing in a car Spotify Playlist Cover Art"/>
                </div>
                <div className="login-page-container-right">
                    <h1 className="login-page-title">Spotify Stats</h1>
                    <p className="login-page-under-title">Check what you've been listening to !</p>
                    <IconButton size="large" width="60%" roundedCorners="15px" onclick={this.login} label="Login with Spotify" icon={faSpotify} bgColor="#1ED760" textColor="#FFF" iconColor="#FFF" iconPos="left"/>
                </div>
            </div>
         );
    }
}
 
export default LoginPage;