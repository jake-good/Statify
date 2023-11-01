import React, { useState } from "react";
import { SpotifySong } from "../models/apimodels";

type SongsProps = {
  topSongs: SpotifySong[];
};

export default function Songs({ topSongs }: SongsProps): React.JSX.Element {
  return (
    <div className="songs-container">
      {topSongs.length ? (
        topSongs.map((song) => <Song song={song} key={song.id} />)
      ) : (
        <p className="error-message">
          Didn't recieve any data from the API. Try logging in again
        </p>
      )}
    </div>
  );
}

type SongProps = {
  song: SpotifySong;
};

function Song({ song }: SongProps): React.JSX.Element {
  const [expanded, setExpanded] = useState(false);

  function toggle() {
    setExpanded(!expanded);
  }

  function handleLink(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    window.open(song.external_urls.spotify, "_blank", "noreferrer");
  }

  const expandedView = (
    <div className="artist expanded" key={song.id} onClick={() => toggle()}>
      <img src={song.album.images[0].url} alt={song.name} />
      <div className="artist-info">
        <p className="name">{song.name}</p>
        <p className="artists">
          by {song.artists.map((artist) => artist.name).join(", ")}
        </p>
        <button className="primary" onClick={handleLink}>
          <i className="fa fa-spotify" /> Find on Spotify
        </button>
      </div>
    </div>
  );

  const unExpandedView = (
    <div className="artist unexpanded" key={song.id} onClick={() => toggle()}>
      <p>{song.name}</p>
    </div>
  );

  return expanded ? expandedView : unExpandedView;
}
