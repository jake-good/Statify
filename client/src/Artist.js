import React from 'react'


class Artist extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            //In this div display the artist picture, name, popularity and have it link to their spotify page
            <div className='Artist'>
                <h1>{this.props.artist.name}</h1>
                <p>popularity: {this.props.artist.popularity}</p>
                <p><a href={this.props.artist.external_urls.spotify}>link to the artist page</a></p>
                <img src={this.props.artist.images[0].url}></img>
            </div>
        )
    }
}

export default Artist