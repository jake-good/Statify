import React from "react";
import { useState } from "react";
import { SpotifyArtist } from "../models/apimodels";

type ArtistsProps = {
  artists: SpotifyArtist[];
};

export default function Artists({ artists }: ArtistsProps): React.JSX.Element {
  return (
    <div className="container">
      {artists.length ? (
        artists.map((artist) => <Artist artist={artist} key={artist.id} />)
      ) : (
        <p className="error-message">
          Didn't recieve any data from the API. Try logging in again
        </p>
      )}
    </div>
  );
}

type ArtistPropss = {
  artist: SpotifyArtist;
};

function Artist({ artist }: ArtistPropss): React.JSX.Element {
  const [expanded, setExpanded] = useState(false);

  function toggle() {
    setExpanded(!expanded);
  }

  function handleLink(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    window.open(artist.external_urls.spotify, "_blank", "noreferrer");
  }

  const expandedView = (
    <div className="artist expanded" onClick={() => toggle()}>
      <img src={artist.images[0].url} alt={artist.name} />
      <div className="artist-info">
        <p className="name">{artist.name}</p>
        <p className="genres">Genres: {artist.genres.join(", ")}</p>
        <button className="primary" onClick={handleLink}>
          <i className="fa fa-spotify" /> Find on Spotify
        </button>
      </div>
    </div>
  );

  const unExpandedView = (
    <div className="artist unexpanded" key={artist.id} onClick={() => toggle()}>
      <p>{artist.name}</p>
    </div>
  );

  return expanded ? expandedView : unExpandedView;
}
