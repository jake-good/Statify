import React, { Component } from "react";
import "./App.css";
import "./App2.css";
import Artist from "./Artist";
import Login from "./Login";
import Footer from "./Footer";
import ClipLoader from 'react-spinners/ClipLoader';
import ScrollBar from 'react-scrollbars-custom';

import SpotifyWebApi from "spotify-web-api-js";
import { getTopArtists } from './spotifyApiClient';
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
      loading: false
    };
  }

  componentDidMount() {
    this.getTopArtistData();
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

  getTopArtistData(time_range = this.state.time_range) {
    if (this.state.loggedIn) {
      this.setState({ loading: true });

      getTopArtists(this.state.time_range)
        .then(response => {
          this.setState({ topArtists: response.items });
          this.setState({ loading: false });
        });
    }
  }

  buildArtists() {
    let Artists = this.state.topArtists.map(item => <Artist artist={item} key={item.id+Date.now()}/>);
    return Artists;
  }

  updateTimeRange(timeRange) {
    this.setState({time_range: timeRange}, () => this.getTopArtistData());
  }

  logout() {
    window.location.hash = '';
    this.setState({ loggedIn: false});
  }

  render() {
    let Container;
    let Head;

    if (!this.state.loggedIn) {
      Container = (
        <div>
          <Login/>
        </div>
      );
    } else {
      Container = <div className="artists-container">
        {
          this.state.loading ? <ClipLoader color={'#1db954'} size={20}/> : <ScrollBar>{this.buildArtists()}</ScrollBar>
        }
        </div>
      Head = (
          <div className="header">
            <h1 id="main_title">Statify</h1>
            <div>
              <h2 id="sub_title">How recent do you want your statistics?</h2>
              <div className="button_container">
                <button className={(this.state.time_range === 'short_term' ? 'selected ' : '') + "buttonDefault"} onClick={() => this.updateTimeRange("short_term")}>
                  1 month
                </button>
                <button className={(this.state.time_range === 'medium_term' ? 'selected ' : '') + "buttonDefault"} onClick={() => this.updateTimeRange("medium_term")}>
                  3 months
                </button>
                <button className={(this.state.time_range === 'long_term' ? 'selected ' : '') + "buttonDefault"} onClick={() => this.updateTimeRange("long_term")}>
                  Several years
                </button>
              </div>
            </div>
            
            <button className="buttonInverse logoutButton" onClick={() => this.logout()}>Log out</button>
          </div>
          
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
