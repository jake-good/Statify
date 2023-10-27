import React, { useState } from "react";
import { SpotifyApiClient } from "../api/spotifyApiClient";
import { Link, Navigate } from "react-router-dom";

export default function Redirect() {
    const [loggedIn, setLoggedIn] = useState<Boolean>(false);
    const [hasError, setHasError] = useState<Boolean>(false);

    if (!loggedIn) {
        let client: SpotifyApiClient = SpotifyApiClient.getInstance();
        client.decodeUrlAndGetToken().then(() => {
            setLoggedIn(true);
        }).catch(() => setHasError(true));  
    }

    let ErrorPage = <div className="errorPageDiv">
        <h2>Error authenticating with the Spotify API.</h2>
        <Link to="/"><button className="buttonDefault">Return to home page</button></Link>
    </div>
      
    if (loggedIn) return (<Navigate to="/stats" />);
    if (hasError) return ErrorPage;
    return (<></>);
}