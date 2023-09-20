import React from "react";

class Artist extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    };
  }

  toggle() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    let container;
    
    if (!this.state.expanded) {
      container = (
        <div className="unexpanded_artist_title">
          <p>{this.props.artist.name}</p>
        </div>
      );
    } else {
      let genresList = "";
      for (var genre in this.props.artist.genres) {
        genresList += this.props.artist.genres[genre] + ", ";
      }
      container = (
        <div className="expanded_artist">
          <section className="img_box">
            <img src={this.props.artist.images[0].url} />
          </section>
          <div className="artist_details">
            <h1 id="expanded_title">{this.props.artist.name}</h1>
            <p id="expand_details">
              Followers: {this.props.artist.followers.total}
            </p>
            <p id="expand_details">Genres: {genresList}</p>
          </div>
          <a
            id="spotify_link_button"
            href={this.props.artist.external_urls.spotify}
            target="blank"
            title="Go to artist's spotify page"
          >
            <i className="fa fa-spotify fa-2x" />
          </a>
        </div>
      );
    }

    return (
      //In this div display the artist picture, name, popularity and have it link to their spotify page
      <div className="Artist" onClick={() => this.toggle()}>
        {container}
      </div>
    );
  }
}

export default Artist;
