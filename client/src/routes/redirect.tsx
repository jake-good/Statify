import React, { useState } from "react";
import { SpotifyApiClient } from "../api/spotifyApiClient";
import { Navigate } from "react-router-dom";

export default function Redirect() {
    const [loggedIn, setLoggedIn] = useState<Boolean>(false);

    if (!loggedIn) {
        let client: SpotifyApiClient = SpotifyApiClient.getInstance();
        client.decodeUrlAndGetToken().then(() => {
            setLoggedIn(true);
        });  
    }
      
    if (loggedIn) return (<Navigate to="/stats" />)
    return (<></>);
}