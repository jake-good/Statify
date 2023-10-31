# Statify
A React app using the Spotify API to get a users top artists. Log in with your Spotify account and view your top artists over various time ranges. Hosted live via netlify [here!](https://statify-jake.netlify.app/)

### Local Setup
  1.   Make a spotify developer account and get a client id. https://developer.spotify.com/
  2.   Add a new file to the client directory called config.json
```
  cd client
  touch config.json
```
  3.   Run `npm i` to install packages.
  4.   Add a new key to your config.json file "clientId" and give it the value of your client id from the spotify API.

```
{
    "clientId": "yourIDgoeshere"
}
```
  5. `npm start` to run.

### Features
- Lightweight client to interface with the Spotify Api
  - OAuth2 Authentication using PKCE flow
  - Fetching user top listening data; songs and artists
- Responsive React UI

<img src="https://github.com/jake-good/Statify/assets/39504124/15a97d30-a786-4cbf-8cf3-03e745c88550" width="700px">
<img src="https://github.com/jake-good/Statify/assets/39504124/ae1a3f3c-c618-4564-bef5-b6191c7d2e31" width="700px">
<img src="https://github.com/jake-good/Statify/assets/39504124/5604e4f8-9726-4d01-b5c7-588396c31ebb" width="700px">
