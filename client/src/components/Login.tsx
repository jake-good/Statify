import React from "react";
import { SpotifyApiClient } from "../api/spotifyApiClient";

export default function Login() {
    let client = SpotifyApiClient.getInstance();
    return (
        <div className="login_container">
        <h1 id="main_title">Statify</h1>

        <p className="login_info_text">
          This application uses your spotify user listening information to
          provide statistics on your top artists. Spotify's own login service is
          used for authentication. To find out your listening info click the
          button below and log in to your account.
        </p>
        <button className="login_button buttonDefault" onClick={() => client.login()}>
          GO TO SPOTIFY LOGIN
        </button>
      </div>
    )
}