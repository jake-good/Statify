import React, { Component } from "react";
import "./App.css";
import Artist from "./Artist";
import Login from "./Login";

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
    console.log("api call");
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

  handleResults(time_range) {
    this.setState({ time_range: time_range });
    this.getData(time_range);
  }

  scrollFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  componentDidMount() {
    if (process.env.BROWSER) {
      document.addEventListener(
        "scroll",
        e => this._handleOnScrollDocument(e),
        true
      );
    }
  }

  redirect() {
    var client_id = "d8c9e8ca3c784898bdf939f51ff6136f"; // Your client id
    var redirect_uri = "http://localhost:3000"; // Your redirect uri
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
      Container = this.makeArtists(this.state.expand_all);
      Head = (
        <header>
          <h1 id="main_title">Statify</h1>
          <h2 id="sub_title">How recent do you want your statistics?</h2>
          <div className="button_container">
            <button onClick={() => this.handleResults("short_term")}>
              1 month
            </button>
            <button onClick={() => this.handleResults("medium_term")}>
              3 months
            </button>
            <button onClick={() => this.handleResults("long_term")}>
              Several years
            </button>
          </div>

          {scrollButton}
        </header>
      );
    }

    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollButton = (
        <button
          title="Return to top "
          className="expand_button"
          onClick={() => this.scrollFunction()}
        >
          <i className="fa fa-angle-up fa-2x" />
        </button>
      );
      console.log("scrolled");
    }

    return (
      <div className="App">
        {Head}
        {Container}
      </div>
    );
  }
}

export default App;
