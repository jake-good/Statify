import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Artist from '../components/Artist';
import Footer from '../components/Footer';
import ClipLoader from 'react-spinners/ClipLoader';
import ScrollBar from 'react-scrollbars-custom';
import { SpotifyApiClient } from '../api/spotifyApiClient';
import './../App.css'
import React from 'react';
import { SpotifyArtist } from '../models/apimodels';

export default function Stats() {
    const [topArtists, setTopArtists] = useState<SpotifyArtist[]>([]);
    const [timeRange, setTimeRange] = useState('medium_term');
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState<Boolean>(false);
    const client = SpotifyApiClient.getInstance();

    useEffect(() => {
            setLoading(true);
            client.getTopArtist(timeRange)
                .then(
                  response => {
                  setTopArtists(response);
                  setLoading(false);
                }
              ).catch(() => setHasError(true));
    },[client, timeRange]);

    function buildArtists() {
        let Artists = topArtists.map(item => <Artist artist={item} key={item.id+Date.now()}/>);
        return Artists;
    }

    let Container;
    let Head;

    let ErrorMessage = <p>Unable to fetch user data from the API. Try loggin in again.</p>

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
              <button className={(timeRange === 'short_term' ? 'selected ' : '') + "buttonDefault"} onClick={() => setTimeRange("short_term")}>
                1 month
              </button>
              <button className={(timeRange === 'medium_term' ? 'selected ' : '') + "buttonDefault"} onClick={() => setTimeRange("medium_term")}>
                3 months
              </button>
              <button className={(timeRange === 'long_term' ? 'selected ' : '') + "buttonDefault"} onClick={() => setTimeRange("long_term")}>
                Several years
              </button>
            </div>
          </div>
          
          <Link to="/"><button className="buttonInverse logoutButton">Log out</button></Link>
        </div>
    );

    return (
      <div className="App">
          {Head}
          {hasError ? ErrorMessage : Container}
          <Footer />
    </div>
    )
};