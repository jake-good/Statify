import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Artist from './../Artist';
import Login from './../Login';
import Footer from './../Footer';
import ClipLoader from 'react-spinners/ClipLoader';
import ScrollBar from 'react-scrollbars-custom';
import SpotifyWebApi from "spotify-web-api-js";
import { getTopArtists } from './../spotifyApiClient';
import "./../App2.css";


export default function Stats() {
    const [topArtists, setTopArtists] = useState([]);
    const [timeRange, setTimeRange] = useState('');
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoading(true);
        getTopArtists(timeRange)
            .then(response => {
            setTopArtists(response.items);
            setLoading(false);
            });
        
    },[timeRange]);

    const spotifyApi = new SpotifyWebApi();

    const params = getHashParams();
    const token = params.access_token;

    if (token && !loggedIn) {
      spotifyApi.setAccessToken(token);
      setLoggedIn(true);
    }

    function buildArtists() {
        let Artists = topArtists.map(item => <Artist artist={item} key={item.id+Date.now()}/>);
        return Artists;
    }

    function updateTimeRange(timeRange) {
        setTimeRange(timeRange); 
    }

    let Container;
    let Head;
    if (!timeRange.length) setTimeRange('medium_term')
    if (!loggedIn) {
      Container = (
        <div>
          <Login/>
        </div>
      );
    } else {
      Container = <div className="artists-container">
        {
          loading ? <ClipLoader color={'#1db954'} size={20}/> : <ScrollBar>{buildArtists()}</ScrollBar>
        }
        </div>
      Head = (
          <div className="header">
            <h1 id="main_title">Statify</h1>
            <div>
              <h2 id="sub_title">How recent do you want your statistics?</h2>
              <div className="button_container">
                <button className={(timeRange === 'short_term' ? 'selected ' : '') + "buttonDefault"} onClick={() => updateTimeRange("short_term")}>
                  1 month
                </button>
                <button className={(timeRange === 'medium_term' ? 'selected ' : '') + "buttonDefault"} onClick={() => updateTimeRange("medium_term")}>
                  3 months
                </button>
                <button className={(timeRange === 'long_term' ? 'selected ' : '') + "buttonDefault"} onClick={() => updateTimeRange("long_term")}>
                  Several years
                </button>
              </div>
            </div>
            
            <Link to="/"><button className="buttonInverse logoutButton">Log out</button></Link>
          </div>
          
      );
    }

    return (
        <div className="App">
            {Head}
            {Container}
            <Footer />
      </div>
    )
};

function getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}