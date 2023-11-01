import React from "react";
import { SpotifyApiClient } from "../api/spotifyApiClient";
import Footer from "../components/Footer";

export default function Login() {
  let client = SpotifyApiClient.getInstance();
  return (
    <div id="root-page">
      <div className="header">
        <h1 id="main_title">Statify</h1>
      </div>
      <div className="body">
        <p className="login_info_text">
          Connect your Spotify account to view your listening statistics.
        </p>
        <button className="primary" onClick={() => client.login()}>
          Login with Spotify <i className="fa fa-spotify" />
        </button>
      </div>
      <Footer />
    </div>
  );
}
