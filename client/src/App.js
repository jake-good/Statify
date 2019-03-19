import React, { Component } from 'react';
import './App.css';
import Artist from './Artist';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {

  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      console.log('got token')
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      topArtists: []
    }
  }


  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    console.log('got params');
    return hashParams;
  }


  getData() {
    if(this.state.loggedIn) {
    spotifyApi.getMyTopArtists({time_range: 'long_term'}).then
    (response => 
      this.setState({topArtists: response.items})
    );
    this.getArtistPictures();
  }}

  getArtistPictures() {
    let images = ''
    if(this.state.loggedIn) {
      let artistArray = this.state.topArtists;
      let artistImageURLs = [];
      for (let i = 0; i < artistArray.length; i++) {
        artistImageURLs.push(artistArray[i].images[0].url);
      }
      images = artistImageURLs.map(url => <img src={url}></img>);
      console.log(artistImageURLs);
    }
    return images;
  }

  makeArtists() {
    let Artists = this.state.topArtists.map(item => <Artist artist={item}></Artist>);
    return Artists;
  }
  
  render() {
    let logInButton;
    if (!this.state.loggedIn) {
      logInButton = <button type="button">Click me</button>
    } else {
      logInButton = '';
    }
    return (
      <div className="App">
      <a href="http://localhost:8888">
        {logInButton}
      </a>
      <button onClick={() => this.getData()}>Get top artists</button>
      <div className="imgBox">
        {this.makeArtists()}
      </div>
      </div>
    );
  }
}

export default App;
