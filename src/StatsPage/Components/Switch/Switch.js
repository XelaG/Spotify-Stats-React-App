/** @jsxImportSource @emotion/core */
import React from "react"
import "./Switch.css"
import PropTypes from "prop-types";
import {css} from "@emotion/core";


export default class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstActive: true
        };
    }

    onClickFirst = () => {
        this.setState({firstActive : true});
        this.props.onChange(0)
    }

    onClickSecond = () => {
        this.setState({firstActive : false});
        this.props.onChange(1)
    }


    render() {
        return (
            <div className={"switch-container"}>
                <div css={css`
                background-color: ${this.state.firstActive ? this.props.activeColor : this.props.basicColor};
                color: ${!this.state.firstActive ? this.props.activeColor : this.props.basicColor}`}
                     className={"switch-choice switch-choice-first"} onClick={this.onClickFirst}>
                    {this.props.labelFirst}
                </div>
                <div css={css`
                background-color: ${!this.state.firstActive ? this.props.activeColor : this.props.basicColor};
                color: ${this.state.firstActive ? this.props.activeColor : this.props.basicColor}`}
                     className={"switch-choice switch-choice-second"} onClick={this.onClickSecond}>
                    {this.props.labelSecond}
                </div>
            </div>
        )
    }
}

Switch.defaultProps = {
    basicColor: "#FFF",
    activeColor : "#FF0000"
}

Switch.propType = {
    labelFirst: PropTypes.string.isRequired,
    labelSecond: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    basicColor: PropTypes.string,
    activeColor: PropTypes.string,
}