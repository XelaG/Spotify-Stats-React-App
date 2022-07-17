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
            // topOfWhat can be either artists or tracks
            topOfWhat: "artists",
            // term can be short_term (4 weeks) medium_term (6 month) and long_term (all time)
            term: "short_term",
            isUpdateFinished: true,
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
        var data = await spotifyGetTop(this.state.topOfWhat, this.state.term) 
        this.setState({data: data})
    }

    async componentDidUpdate(prevProps, prevState) {
        console.log("In refresh State")
        if (prevState.typeOfWhat !== this.state.typeOfWhat || prevState.term !== this.state.term) {
            console.log("In refresh State")
            var data = await spotifyGetTop(this.state.topOfWhat, this.state.term)
            console.log("Data =>", data)
            this.setState({data: data})
            this.setState({isUpdateFinished: true})
        }
    }

    

    logout = () => {
        localStorage.clear()
        this.setState({isLoggedIn : false})
    }

    generateCard = (data, nb) => {
        console.log("Data in generate cards => ", data)
        var names = ""
        if (this.state.topOfWhat === "tracks") {
            data.artists.forEach(item => {
                names += item.name
                names += " x "
            })
            names = names.slice(0, -3)
        } else {
            data.genres.forEach(item => {
                names += item
                names += " - "
            })
            names = names.slice(0, -3)
        }
        
        return <InfoCard 
                    pictureUrl={this.state.topOfWhat === "tracks" ? data.album.images[0].url : data.images[0].url}
                    title={data.name}
                    underTitle={names}
                    profileLink={data.external_urls.spotify}
                    number={nb + 1}
                />
    }


    displayCards = () => {
        if (this.state.data === null)
            return null
        if (!this.state.isUpdateFinished)
            return null
        var display = []
        for (let i = 0; i < this.state.data.length; i++) {
            display.push(this.generateCard(this.state.data[i], i))
        }
        return display
    }

    setType = (e) => {
        this.setState({topOfWhat: e.target.value})
        this.setState({isUpdateFinished: false})
    }
    setTerm = (e) => {
        this.setState({term: e.target.value})
        this.setState({isUpdateFinished: false})

    }

    render() {
        return (
            <div className="stats-page-container">
                <div className="nav">
                    <h1 className="site-name">Spotify Stats</h1>
                    <IconButton roundedCorners="0px" width="10%" size="small" onclick={this.logout} label={"Disconnect"} icon={faSignOutAlt} bgColor={"#e83a4b"} textColor={"#FFF"} iconColor={"#FFF"} />
                </div>
                <div onChange={this.setType}>
                    <input type="radio" value="artists" name="type" defaultChecked/> Artists
                    <input type="radio" value="tracks" name="type"/> Tracks
                </div>
                <div onChange={this.setTerm}>
                    <input type="radio" value="short_term" name="term" defaultChecked/> Last Month
                    <input type="radio" value="medium_term" name="term"/> Last 6 Month
                    <input type="radio" value="long_term" name="term"/> All Time
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
