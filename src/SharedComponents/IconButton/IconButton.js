/** @jsxImportSource @emotion/core */

import React from 'react';
import {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faIcons} from "@fortawesome/free-solid-svg-icons";
import "./IconButton.css"
import PropTypes from 'prop-types';
import {css} from '@emotion/core'


class IconButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flexDirection: this.setFlexDirection(),
            sizeValues : this.setSize(),
        }
    }

    setFlexDirection = () => {
        switch (this.props.iconPos) {
            case "left":
                return "row-reverse"
            case "right":
                return "row"
            case "top":
                return "column-reverse"
            case "bottom":
                return "column"
            default:
                return "row-reverse"
        }
    }

    setSize = () => {
        switch (this.props.size) {
            case "small":
                return {
                    font_size: "1vw",
                    icon_size: "1.25vw",
                    padding: "10px 5px",
                    font_size_1024: "1.4vw",
                    icon_size_1024: "1.8vw",
                    padding_1024: "10px 5px",
                    font_size_425: "3vw",
                    icon_size_425: "3.6vw",
                    padding_425: "8px 4px",
                }
            case "medium":
                return {
                    font_size: "1.5vw",
                    icon_size: "1.9vw",
                    padding: "15px 10px",
                    font_size_1024: "2vw",
                    icon_size_1024: "2.5vw",
                    padding_1024: "15px 10px",
                    font_size_425: "3.5vw",
                    icon_size_425: "4.5vw",
                    padding_425: "10px 6px",
                }
            case "large":
                return {
                    font_size: "2vw",
                    icon_size: "2.5vw",
                    padding: "25px 15px",
                    font_size_1024: "2.5vw",
                    icon_size_1024: "3vw",
                    padding_1024: "25px 15px",
                    font_size_425: "4vw",
                    icon_size_425: "6vw",
                    padding_425: "15px 10px",
                }
            default:
                return {
                    font_size: "1.5vw",
                    icon_size: "1.9vw",
                    padding: "15px 10px"
                }
        }
    }

    style = {
        div: {
            backgroundColor: this.props.bgColor,
            borderRadius: this.props.roundedCorners,
            flexDirection: null,
            width: this.props.width,
            padding: null
        },
        label: {
            color: this.props.textColor,
            fontSize: null,
        },
        icon: {
            color: this.props.iconColor,
            fontSize: null,
        }
    };

    isSmall = () => {
        if (this.props.size === "small") {
            return true
        }
        return false
    }

    render() {
        return (
            <div css={css`
            background-color: ${this.props.bgColor};
            border-radius: ${this.props.roundedCorners};
            width: ${this.props.width};
            flex-direction: ${this.state.flexDirection};
            padding: ${this.state.sizeValues.padding};
            @media screen and (max-width: 1024px) {
                padding:  ${this.state.sizeValues.padding_1024};
            }
            @media screen and (max-width: 425px) {
                padding:  ${this.state.sizeValues.padding_425};
            }
        `} onClick={this.props.onclick} className="icon-button-container">
                <p css={css`
                color: ${this.props.textColor};
                font-size: ${this.state.sizeValues.font_size};
                @media screen and (max-width: 1024px) {
                    font-size:  ${this.state.sizeValues.font_size_1024};
                }
                @media screen and (max-width: 425px) {
                    ${this.isSmall() ? "display:none;" : null}
                    font-size: ${this.state.sizeValues.font_size_425};
                }
                `} className="icon-button-label">{this.props.label}</p>
                <FontAwesomeIcon icon={this.props.icon} css={css`
                color: ${this.props.iconColor};
                font-size: ${this.state.sizeValues.icon_size};
                @media screen and (max-width: 1024px) {
                    font-size:  ${this.state.sizeValues.icon_size_1024};
                }
                @media screen and (max-width: 1024px) {
                    font-size:  ${this.state.sizeValues.icon_size_425};
                }
                `} className="icon-button-icon"/>
            </div>
        );
    }
}

IconButton.defaultProps = {
    onclick: null,
    label: "Icon Button",
    icon: faIcons,
    bgColor: "#fff",
    roundedCorners: "4px",
    textColor: "#000",
    iconColor: "#000",
    iconPos: "left",
    width: "20%",
    size: "large",
};

IconButton.propTypes = {
    onclick: PropTypes.any.isRequired
}

export default IconButton