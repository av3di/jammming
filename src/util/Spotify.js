const clientId = '';
const redirectUri = 'http://localhost:3000/';

function generateCodeVerifier(length) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}
async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
  const hashed = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(hashed)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

const Spotify = {
  async authorize() {
    const codeVerifier = generateCodeVerifier(64);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    window.localStorage.setItem('code_verifier', codeVerifier);

    const url = 'https://accounts.spotify.com/authorize';
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: 'playlist-modify-public',
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    });

    window.location.href = `${url}?${params.toString()}`;
  },
  async getAccessToken(code) {
    let codeVerifier = window.localStorage.getItem('code_verifier');

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    }

    const url = 'https://accounts.spotify.com/api/token';
    try {
      const result = await fetch(url, payload);
      const response = await result.json();
      window.localStorage.setItem('access_token', response.access_token);
    } catch (error) {
      console.log("No access token created: " + error);
      throw error;
    }
  },
  async search() {
    const url = 'https://api.spotify.com/v1/search';
    console.log('serachin....');
    const params = new URLSearchParams({
      q: 'cold',
      type: 'track',
    });
    try {
      const accessToken = window.localStorage.getItem('access_token');
      const result = await fetch(`${url}?${params.toString()}`, {
        headers: {
              Authorization: `Bearer ${accessToken}`
        }
      });
      const response = await result.json();
      console.log('done search');
      console.log(response);
    } catch (error) {
      console.log('Something went wrong with search: ' + error);
      throw error;
    }
  }
};

export default Spotify;
