import React from 'react';
import {useState } from 'react';

type Props = {
    artist: SpotifyApi.ArtistObjectFull;
}

export default function Artist({ artist }: Props): React.JSX.Element {
    const [expanded, setExpanded] = useState(false);

    function toggle() {
        setExpanded(!expanded);
    }

    let genresList = "";
    for (var genre in artist.genres) {
        genresList += artist.genres[genre] + ", ";
    }

    return(
        <div className="Artist" onClick={() => toggle()}>
            {expanded ? <div className="expanded_artist">
          <section className="img_box">
            <img src={artist.images[0].url} alt='artist'/>
          </section>
          <div className="artist_details">
            <h1 id="expanded_title">{artist.name}</h1>
            <p id="expand_details">
              Followers: {artist.followers.total}
            </p>
            <p id="expand_details">Genres: {genresList}</p>
          </div>
          <a
            id="spotify_link_button"
            href={artist.external_urls.spotify}
            target="blank"
            title="Go to artist's spotify page"
          >
            <i className="fa fa-spotify fa-2x" />
          </a>
        </div> : <div className="unexpanded_artist_title">
          <p>{artist.name}</p>
        </div>}
        </div>
        );
}