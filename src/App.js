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
  }

  const [searchExecuted, setSearchExecuted] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  const onSearch = async (term) => {
      if (!searchExecuted) await Spotify.getAccessToken(code);
      try {
        const results = await Spotify.search(term);
        setSearchResults(results);
        setSearchExecuted(true);
      } catch (connectionError) {
        console.log('Error retrieving results: ' + connectionError);
        setError('Sorry, something went wrong. Please try again later');
      }
  };

  const [playlistName, setPlaylistName]  = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = (track) => {
    setPlaylistTracks(prev => [...prev, track]);
  };

  const removeTrack = ({id}) => {
    setPlaylistTracks((prev) => prev.filter(track => track.id !== id));
  }

  let body;
  if (loggedIn) {
    body = (
      <>
        <SearchBar onSearch={onSearch} />
        {error && <p class="error">{error}</p>}
        {searchExecuted && (
          <div className="main-panel">
            <SearchResults tracks={searchResults} onAdd={addTrack} />
            <Playlist
              tracks={playlistTracks}
              onRemove={removeTrack}
              name={playlistName}
              setName={setPlaylistName}
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
