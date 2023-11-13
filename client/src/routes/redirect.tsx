import React, { useState } from "react";
import { SpotifyLoginClient } from "../api/spotifyApiClient";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Redirect() {
  const [loggedIn, setLoggedIn] = useState<Boolean>(false);
  const [hasError, setHasError] = useState<Boolean>(false);
  const { setAuth } = useAuth();

  if (!loggedIn) {
    let client: SpotifyLoginClient = SpotifyLoginClient.getInstance();
    client
      .decodeUrlAndGetToken()
      .then((token) => {
        setLoggedIn(true);
        setAuth({ accessToken: token });
      })
      .catch(() => setHasError(true));
  }

  let ErrorPage = (
    <div className="errorPageDiv">
      <h2>Error authenticating with the Spotify API.</h2>
      <Link to="/">
        <button className="buttonDefault">Return to home page</button>
      </Link>
    </div>
  );

  if (loggedIn) return <Navigate to="/stats" />;
  if (hasError) return ErrorPage;
  return <></>;
}
