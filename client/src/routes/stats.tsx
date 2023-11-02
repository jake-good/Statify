import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import ClipLoader from "react-spinners/ClipLoader";
import ScrollBar from "react-scrollbars-custom";
import { SpotifyApiClient } from "../api/spotifyApiClient";
import "./../App.less";
import Artists from "./../components/Artist";
import Songs from "./../components/Songs";
import { AccordianButton } from "../components/AccordianButton";
import { useQuery } from "@tanstack/react-query";

export default function Stats() {
  const [timeRange, setTimeRange] = useState("medium_term");
  const [type, setType] = useState("artists");
  const client = SpotifyApiClient.getInstance();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["todos", timeRange, type],
    queryFn: () => client.getTopArtist(timeRange, type),
  });

  const toggleType = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setType(type === "artists" ? "tracks" : "artists");
  };

  const changeTimeRange = (
    newTimeRange: string,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.stopPropagation();
    setTimeRange(newTimeRange);
  };

  return (
    <div id="root-page">
      <div className="header">
        <h1 id="main_title">Statify</h1>
        <div className="accordian-group">
          <AccordianButton
            name={"TIME RANGE"}
            children={
              <>
                <button
                  className={
                    timeRange === "short_term" ? "selected " : "primary"
                  }
                  onClick={(e) => changeTimeRange("short_term", e)}
                >
                  1 month
                </button>
                <button
                  className={
                    timeRange === "medium_term" ? "selected " : "primary"
                  }
                  onClick={(e) => changeTimeRange("medium_term", e)}
                >
                  3 months
                </button>
                <button
                  className={
                    timeRange === "long_term" ? "selected " : "primary"
                  }
                  onClick={(e) => changeTimeRange("long_term", e)}
                >
                  Several years
                </button>
              </>
            }
          />
          <AccordianButton
            name={"ARTISTS // TRACKS"}
            children={
              <>
                <button
                  className={`primary ${type === "artists" ? "selected" : ""}`}
                  onClick={toggleType}
                >
                  Top Artists
                </button>
                <button
                  className={`primary ${type === "tracks" ? "selected" : ""}`}
                  onClick={toggleType}
                >
                  Top Songs
                </button>
              </>
            }
          />
        </div>

        <Link to="/">
          <button id="logout" className="secondary">
            Log out
          </button>
        </Link>
      </div>

      <div className="artists-container">
        {isLoading ? (
          <div className="loading-indicator">
            <ClipLoader color={"#1db954"} size={20} />
          </div>
        ) : isError ? (
          <p className="error-message">
            Unable to fetch user data from the API. Try logging in again.
          </p>
        ) : (
          <ScrollBar>
            {type === "artists" ? (
              <Artists artists={data} />
            ) : (
              <Songs topSongs={data} />
            )}
          </ScrollBar>
        )}
      </div>

      <Footer />
    </div>
  );
}
