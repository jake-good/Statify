import React from 'react';
import {useState } from 'react';
import { SpotifyArtist } from '../models/apimodels';
import './artists.css'

type Props = {
    artists: SpotifyArtist[];
}

export default function Artist({ artists }: Props): React.JSX.Element {
    const [expanded, setExpanded] = useState(false);

    function toggle() {
        setExpanded(!expanded);
    }

    return(
      <div className="container">
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            <img src={artist.images[0].url} alt={artist.name} />
            <p className="name">{artist.name}</p>
            <p className="genres">Genres: {artist.genres.join(', ')}</p>
            <p className="popularity">Popularity: {artist.popularity}</p>
          </li>
        ))}
      </ul>
    </div>
        );
}