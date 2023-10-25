import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

export async function login() {
    var client_id = "d8c9e8ca3c784898bdf939f51ff6136f"; // Your client id
    var redirect_uri = window.location.href + 'stats';
    var state = generateRandomString(16);
    var stateKey = "spotify_auth_state";
    localStorage.setItem(stateKey, state);
    var scope = "user-top-read";
    var url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(client_id);
    url += "&scope=" + encodeURIComponent(scope);
    url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
    url += "&state=" + encodeURIComponent(state);
    window.location = url;
}

export async function getTopArtists(time_range) {
    return spotifyApi
    .getMyTopArtists({
      time_range: time_range,
      limit: '50'
    });
}

 function generateRandomString(length) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }