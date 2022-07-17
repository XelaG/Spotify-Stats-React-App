import React from 'react';
import {Component} from 'react'
import CheckLogin from "../SharedComponents/CheckLogin/CheckLogin";
import {Redirect} from "react-router";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import IconButton from "../SharedComponents/IconButton/IconButton";
import authenticateToSpotify from "./Components/authenticateToSpotify";
import "./StatsPage.css"
import InfoCard from "./Components/InfoCard/InfoCard";
import spotifyGetTop from "./Components/spotifyGetTop";

class StatsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            finishedWithCode: false,
            data: null,
        }
    }

    finishedWithState = () => {
        this.setState({finishedWithCode: true})
    }

    async componentDidMount() {
        var code = new URLSearchParams(this.props.location.search).get("code")
        if (code !== null)
            await authenticateToSpotify(code, this.finishedWithState)
        var loggedIn = await CheckLogin()
        this.setState({isLoggedIn: loggedIn})
        var data = await spotifyGetTop("tracks", "short_term")
        this.setState({data: data})
    }



    logout = () => {
        localStorage.clear()
        this.setState({isLoggedIn : false})
    }

    generateCard = (data, nb) => {
        var names = ""
        data.artists.forEach(item => {
            names += item.name
            names += " x "
        })
        names = names.slice(0, -3)
        return <InfoCard pictureUrl={data.album.images[0].url} title={data.name} underTitle={names} profileLink={data.external_urls.spotify} number={nb + 1}/>
    }


    displayCards = () => {
        if (this.state.data === null)
            return null
        var display = []
        for (let i = 0; i < this.state.data.length; i++) {
            display.push(this.generateCard(this.state.data[i], i))
        }
        return display
    }

    render() {
        return (
            <div className="stats-page-container">
                <div className="nav">
                    <h1 className="site-name">Spotify Stats</h1>
                    <IconButton roundedCorners="0px" width="10%" size="small" onclick={this.logout} label={"Disconnect"} icon={faSignOutAlt} bgColor={"#e83a4b"} textColor={"#FFF"} iconColor={"#FFF"} />
                </div>
                <div className="stats-page-content">
                    {this.displayCards()}
                </div>
                {this.state.isLoggedIn ? null : <Redirect to={"/"} />}
                {this.state.finishedWithCode ? <Redirect to={"/stats"} />: null}
            </div>
        );
    }
}

export default StatsPage;
