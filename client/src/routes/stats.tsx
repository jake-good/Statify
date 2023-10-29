import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import ClipLoader from 'react-spinners/ClipLoader';
import ScrollBar from 'react-scrollbars-custom';
import { SpotifyApiClient } from '../api/spotifyApiClient';
import './../App.css';
import { SpotifyArtist } from '../models/apimodels';
import Artist from './../components/Artist';
import Songs, { Song } from './../components/Songs';

export default function Stats() {
  const [topArtists, setTopArtists] = useState<SpotifyArtist[]>([]);
  const [topSongs, setTopSongs] = useState<Song[]>([]);
  const [timeRange, setTimeRange] = useState('medium_term');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('artists'); // Default to 'artists'
  const [hasError, setHasError] = useState(false);
  const client = SpotifyApiClient.getInstance();

  useEffect(() => {
    setLoading(true);
    client
      .getTopArtist(timeRange, type)
      .then((response) => {
        if (type === 'artists') {
          setTopArtists(response);
        } else if (type === 'tracks') {
          setTopSongs(response);
        }
        setLoading(false);
        setHasError(false);
      })
      .catch(() => {
        setLoading(false);
        setHasError(true);
      });
  }, [client, timeRange, type]);

  const toggleType = () => {
    setType(type === 'artists' ? 'tracks' : 'artists');
  };

  return (
    <div className="App">
      <div className="header">
        <h1 id="main_title">Statify</h1>
        <div>
          <h2 id="sub_title">How recent do you want your statistics?</h2>
          <div className="button_container">
            <button
              className={(timeRange === 'short_term' ? 'selected ' : '') + 'buttonDefault'}
              onClick={() => setTimeRange('short_term')}
            >
              1 month
            </button>
            <button
              className={(timeRange === 'medium_term' ? 'selected ' : '') + 'buttonDefault'}
              onClick={() => setTimeRange('medium_term')}
            >
              3 months
            </button>
            <button
              className={(timeRange === 'long_term' ? 'selected ' : '') + 'buttonDefault'}
              onClick={() => setTimeRange('long_term')}
            >
              Several years
            </button>
          </div>
          <div className="type-toggle">
            <button
              className={`buttonDefault ${type === 'artists' ? 'selected' : ''}`}
              onClick={toggleType}
            >
              Top Artists
            </button>
            <button
              className={`buttonDefault ${type === 'tracks' ? 'selected' : ''}`}
              onClick={toggleType}
            >
              Top Songs
            </button>
          </div>
          <Link to="/">
            <button className="buttonInverse logoutButton">Log out</button>
          </Link>
        </div>
      </div>

      {/* Conditional rendering based on 'type' */}
      <div className="artists-container">
        {loading ? (
          <div className="loading-indicator">
            <ClipLoader color={'#1db954'} size={20} />
          </div>
        ) : hasError ? (
          <p className="error-message">Unable to fetch user data from the API. Try logging in again.</p>
        ) : (
          <ScrollBar>
            {type === 'artists' ? <Artist artists={topArtists} /> : <Songs topSongs={topSongs} />}
          </ScrollBar>
        )}
      </div>

      <Footer />
    </div>
  );
}
