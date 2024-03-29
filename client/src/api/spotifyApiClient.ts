import { base64encode, generateRandomString, sha256 } from "./helpers";
import config from './../../config.json';

export class SpotifyApiClient {

  private static instance: SpotifyApiClient;
  private clientId: string;

  private constructor() {
    this.clientId = config.clientId;
  }

  public static getInstance(): SpotifyApiClient {
    if (!this.instance) {
      this.instance = new SpotifyApiClient();
    }
    return this.instance;
  }

  private getRedirectUri = () => {
    return window.location.href.includes('localhost') ? 'http://localhost:3000/redirect' : 'https://statify-jake.netlify.app/redirect';
  }

  login = async () => {
    const codeVerifier  = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
  
    const redirectUri = this.getRedirectUri();
  
    const scope = 'user-top-read';
    const authUrl = new URL("https://accounts.spotify.com/authorize")
  
    // generated in the previous step
    window.localStorage.setItem('code_verifier', codeVerifier);
  
    const params =  {
      response_type: 'code',
      client_id: this.clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    }
  
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  }
  
  decodeUrlAndGetToken = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    if (code) return await this.getToken(code);
  }
  
  private getToken = async (code: string) => {
    let codeVerifier = localStorage.getItem('code_verifier') || undefined;
    const redirectUri = this.getRedirectUri();
    const url = new URL("https://accounts.spotify.com/api/token")
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: this.clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      } as any),
    }
  
    const body = await fetch(url, payload);
    const response = await body.json();
    if (response.access_token == null) {
      throw new Error('failed to fetch token');
    }
    localStorage.setItem('access_token', response.access_token);
  }  

  getTopArtist = async (timeRange: string, type: string = 'artists'): Promise<[]> => {
    const token = localStorage.getItem('access_token');

    if (token == null) {
      throw new Error('Unable to find access token, try loggin in again');
    }
    
    const apiUrl = `https://api.spotify.com/v1/me/top/${type}`;
    const limit = 50;
    const offset = 0;

    const url = `${apiUrl}?time_range=${timeRange}&limit=${limit}&offset=${offset}`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, { method: 'GET', headers });
    const data = await response.json();
    return data.items;
  }
}
