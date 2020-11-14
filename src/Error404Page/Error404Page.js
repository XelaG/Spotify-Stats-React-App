import React from 'react';
import "./Error404Page.css"
import IconButton from "../SharedComponents/IconButton/IconButton";
import {useHistory} from "react-router";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";

function Error404Page() {
        return (
            <div className={"error-page"}>
                <h1 className={"error-message"}>Error 404</h1>
                <IconButton onclick={useHistory().goBack} label={"Go Back"} icon={faArrowLeft} size="large" bgColor="#1ED760" textColor="#212121" iconColor="#212121"/>
            </div>
        );
}

export default Error404Page;