import React from 'react';
import './songs.css';

export interface Song {
  id: string;
  name: string;
  album: {
    images: { url: string }[];
  };
  artists: { name: string }[];
}

type Props = {
    topSongs: Song[]
}

export default function Songs({ topSongs }: Props): React.JSX.Element {
  return (
    <div className="container">
      <ul>
        {topSongs.map((song) => (
          <li key={song.id}>
            <img src={song.album.images[0].url} alt={song.name} />
            <p className="name">{song.name}</p>
            <p className="artist">{song.artists[0].name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};