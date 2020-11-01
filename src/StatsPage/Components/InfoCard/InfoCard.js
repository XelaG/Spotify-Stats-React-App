import React from 'react'
import ReactCardFlip from "react-card-flip";
import "./InfoCard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSpotify} from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";


export default class InfoCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false,
        }
    }

    render() {
        return (
            <div className="card-container">
                <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                    <div className="card-face card-face-front" onMouseEnter={() => this.setState({isFlipped: true})}>
                        <h1 className="card-front-position">#{this.props.number}</h1>
                    </div>
                    <div className="card-face card-face-back">
                        <img src={this.props.pictureUrl} alt="artist" className="card-back-picture"/>
                        <h3 className="card-back-title">{this.props.title}</h3>
                        <h5 className="card-back-under-title">{this.props.underTitle}</h5>
                        <a target="_blank" rel="noopener noreferrer" href={this.props.profileLink}><FontAwesomeIcon icon={faSpotify} className="card-back-icon"/></a>
                    </div>
                </ReactCardFlip>
            </div>
        )
    }
}

InfoCard.defaultProps = {
    pictureUrl: "https://i.insider.com/5b3f8cff447aad22008b4c2f?width=1100&format=jpeg&auto=webp",
    title: "Artist",
    underTitle: "Genre",
    profileLink: "https://spotify.com",
    number: 0
}

InfoCard.propType = {
    pictureUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    underTitle: PropTypes.string.isRequired,
    profileLink: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired
}
