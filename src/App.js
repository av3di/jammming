import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import Playlist from './components/Playlist/Playlist';
import SearchResults from './components/SearchResults/SearchResults';
import Spotify from './util/Spotify';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [code, setCode] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if(params.get("code")) {
      setCode(params.get("code"));
      setLoggedIn(true);
    }
  }, []);

  const handleClick = async () => {
    if(!code) await Spotify.authorize();
  };

  const [hasAccessToken, setHasAccessToken] = useState(false);
  const [searchInProgress, setSearchInProgress] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [nextResultsUrl, setNextResultsUrl] = useState('');
  const [prevResultsUrl, setPrevResultsUrl] = useState('');

  const onSearch = async (term) => {
      try {
        if (!hasAccessToken && !searchInProgress) await Spotify.getAccessToken(code);
        setHasAccessToken(true);
        const url = Spotify.searchByQuery(term);
        await getResults(url);
      } catch (connectionError) {
        setError('Sorry, something went wrong. Please try again later');
      }
  };

  const getResults = async (url) => {
    setSearchInProgress(true);
    try {
      const tracks = await Spotify.search(url);
      setSearchResults(tracks.items);
      setNextResultsUrl(tracks.next);
      setPrevResultsUrl(tracks.previous);
      setSearchInProgress(false);
    } catch (connectionError) {
      setError('Sorry, something went wrong. Please try again later');
    }
  };

  const [playlistName, setPlaylistName]  = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistError, setPlaylistError] = useState('');
  const [playlistSuccess, setPlaylistSuccess] = useState('');

  const addTrack = (track) => {
    if (playlistTracks.length < 100)
      setPlaylistTracks(prev => [...prev, track]);
  };

  const removeTrack = ({id}) => {
    setPlaylistTracks((prev) => prev.filter(track => track.id !== id));
  }

  const savePlaylist = async () => {
    const playlistURIs = playlistTracks.map((track) => track.uri);
    try {
      await Spotify.savePlaylist(playlistName, playlistURIs);
      setPlaylistName('');
      setPlaylistTracks([]);
      setPlaylistSuccess('success! playlist saved');
    } catch (playlistErrors) {
      setPlaylistError('Sorry, this playlist could not be saved. Please try again later');
    }
  };

  useEffect(() => {
    let timeout;
    if (playlistSuccess.length > 0) {
      timeout = setTimeout(() => {
        setPlaylistSuccess('');
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [playlistSuccess]);

  let body;
  if (loggedIn) {
    body = (
      <>
        <SearchBar
          onSearch={onSearch}
          searchInProgress={searchInProgress}
        />
        {error && <p className="error">{error}</p>}
        {hasAccessToken && (
          <div className="main-panel">
            <SearchResults tracks={searchResults}
              onAdd={addTrack}
              limitReached={playlistTracks.length === 100}
              getResults={getResults}
              nextResultsUrl={nextResultsUrl}
              prevResultsUrl={prevResultsUrl}
            />
            <Playlist
              tracks={playlistTracks}
              onRemove={removeTrack}
              error={playlistError}
              success={playlistSuccess}
              name={playlistName}
              setName={setPlaylistName}
              onSave={savePlaylist}
            />
          </div>
        )}
      </>
    );
  } else {
    body = <button className="login" onClick={handleClick}>log in to spotify</button>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 onClick={handleClick}>jammming</h1>
      </header>
      {body}
    </div>
  );
}

export default App;
