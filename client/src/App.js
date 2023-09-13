import React, { Component } from "react";
import "./App.css";
import "./App2.css";
import Artist from "./Artist";
import Login from "./Login";
import Footer from "./Footer";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      topArtists: [],
      nresults: "50",
      time_range: "short_term",
      expand_all: false
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

  getData(time_range = this.state.time_range) {
    if (this.state.loggedIn) {
      spotifyApi
        .getMyTopArtists({
          time_range: time_range,
          limit: this.state.nresults
        })
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

  toggle() {
    this.setState({
      expand_all: !this.state.expand_all
    });
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
    var redirect_uri = window.location.href;
    var state = this.generateRandomString(16);
    var stateKey = "spotify_auth_state";
    localStorage.setItem(stateKey, state);
    var scope = "user-top-read";
    var url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(client_id);
    url += "&scope=" + encodeURIComponent(scope);
    url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
    url += "&state=" + encodeURIComponent(state);
    window.location = url;
  }

  updateTimeRange(timeRange) {
    this.setState({time_range: timeRange});
    this.getData();
  }

  logout() {
    window.location.hash = '';
    this.setState({ loggedIn: false});
  }

  render() {
    console.log("re render");
    let Container;
    let Head;
    let scrollButton;

    if (!this.state.loggedIn) {
      Container = (
        <div>
          <Login redirect={() => this.redirect()} />
        </div>
      );
    } else {
      if (this.state.topArtists.length == 0) {
        this.getData();
      }
      Container = this.makeArtists(this.state.expand_all);
      Head = (
        <header>
          <div className="headerDiv">
            <h1 id="main_title">Statify</h1>
            <button className="buttonInverse logoutButton" onClick={() => this.logout()}>Log out</button>
          </div>
          <h2 id="sub_title">How recent do you want your statistics?</h2>
          <div className="button_container">
            <button className={(this.state.time_range == 'short_term' ? 'selected ' : '') + "buttonDefault"} onClick={() => this.updateTimeRange("short_term")}>
              1 month
            </button>
            <button className={(this.state.time_range == 'medium_term' ? 'selected ' : '') + "buttonDefault"} onClick={() => this.updateTimeRange("medium_term")}>
              3 months
            </button>
            <button className={(this.state.time_range == 'long_term' ? 'selected ' : '') + "buttonDefault"} onClick={() => this.updateTimeRange("long_term")}>
              Several years
            </button>
          </div>

          {scrollButton}
        </header>
      );
    }

    return (
      <div className="App">
        {Head}
        {Container}
        <Footer />
      </div>
    );
  }
}

export default App;
