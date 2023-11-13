import axios from "axios";

export const apiClientPrivate = axios.create({
    baseURL: 'https://api.spotify.com/v1/',
    headers: {
      'Content-Type': 'application/json',
    },
  });