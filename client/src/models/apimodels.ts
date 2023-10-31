export interface SpotifyArtist {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string;
      total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
  }

  export interface SpotifySong {
    id: string;
    name: string;
    album: {
      images: { url: string }[];
    };
    artists: { name: string }[];
    external_urls: {
      spotify: string;
    };
    genres: string[];
  }
  