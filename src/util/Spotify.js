const clientId = '5a20e8b94a404b90a61e59aa6be62a4f';
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

async function getProfile() {
  const url = 'https://api.spotify.com/v1/me';
  const accessToken = window.localStorage.getItem('access_token');
  try {
    const result = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!result.ok) {
      throw new Error('Unknown error');
    }

    const resultJson = await result.json();
    return resultJson;
  } catch (error) {
    console.error(`Could not get profile: ${error}`);
    throw error;
  }
}

async function createPlaylist(userId, playlistName) {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const accessToken = window.localStorage.getItem('access_token');
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'name' : playlistName,
      }),
    });

    if (!response.ok) {
      throw new Error('Unknown error');
    }

    const responseJson = await response.json();
    return responseJson.id;
  } catch (error) {
    console.error(`Could not create playlist: ${error}`);
    throw error;
  }
}

async function saveItemsToPlaylist(playlistId, playlistURIs) {
  const accessToken = window.localStorage.getItem('access_token');
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  try {
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: playlistURIs,
      }),
    });

    if (!result.ok) {
      throw new Error('Unknown error');
    }

  } catch (error) {
    console.error(`Could not save songs to playlist: ${error}`);
    throw error;
  }
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
      console.error("No access token created: " + error);
      throw error;
    }
  },
  async search(url) {
    try {
      const accessToken = window.localStorage.getItem('access_token');
      const result = await fetch(url, {
        headers: {
              Authorization: `Bearer ${accessToken}`
        }
      });
      const response = await result.json();
      return response.tracks;
    } catch (error) {
      console.error('Something went wrong with search: ' + error);
      throw error;
    }
  },
  searchByQuery(q) {
    const url = 'https://api.spotify.com/v1/search';
    const params = new URLSearchParams({
      q,
      type: 'track',
    });
    return `${url}?${params.toString()}`;
  },
  async savePlaylist(playlistName, playlistURIs) {
    try {
      const {id: userId} = await getProfile();
      const playlistId = await createPlaylist(userId, playlistName);
      await saveItemsToPlaylist(playlistId, playlistURIs);
    } catch (error) {
      throw error;
    }
  },
};

export default Spotify;
