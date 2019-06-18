import React, { Component } from "react";
import "./App.css";
import Artist from "./Artist";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      console.log("got token");
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: "Not Checked", albumArt: "" },
      topArtists: []
    };
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getData() {
    if (this.state.loggedIn) {
      spotifyApi
        .getMyTopArtists({ time_range: "long_term" })
        .then(response => this.setState({ topArtists: response.items }));
      //this.getArtistPictures();
    }
  }

  getArtistPictures() {
    let images = "";
    if (this.state.loggedIn) {
      let artistArray = this.state.topArtists;
      let artistImageURLs = [];
      for (let i = 0; i < artistArray.length; i++) {
        artistImageURLs.push(artistArray[i].images[0].url);
      }
      images = artistImageURLs.map(url => <img src={url} />);
    }
    return images;
  }

  makeArtists() {
    let Artists = this.state.topArtists.map(item => <Artist artist={item} />);
    return Artists;
  }

  generateRandomString(length) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  redirect() {
    var client_id = "d8c9e8ca3c784898bdf939f51ff6136f"; // Your client id
    var redirect_uri = "http://localhost:3000"; // Your redirect uri
    var state = this.generateRandomString(16);
    var stateKey = "spotify_auth_state";
    localStorage.setItem(stateKey, state);
    var scope = "user-read-private user-read-email";
    var url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(client_id);
    url += "&scope=" + encodeURIComponent(scope);
    url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
    url += "&state=" + encodeURIComponent(state);
    window.location = url;
  }

  render() {
    let Container;
    if (!this.state.loggedIn) {
      Container = (
        <button type="button" onClick={() => this.redirect()}>
          View my top artists
        </button>
      );
    } else {
      this.getData();
      Container = this.makeArtists();
    }

    return (
      <div className="App">
        <header>
          <h1 id="main_title">Statify</h1>
          <h2 id="sub_title">View your top spotify artists!</h2>
        </header>
        {Container}
      </div>
    );
  }
}

export default App;
