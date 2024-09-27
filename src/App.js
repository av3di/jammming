import React, {useState} from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import Playlist from './components/Playlist/Playlist';
import SearchResults from './components/SearchResults/SearchResults';
import Spotify from './util/Spotify';
let code = '';

function App() {
  let loggedIn = false;
  if (window.localStorage.getItem('access_token') !== null &&
      window.localStorage.getItem('access_token') !== 'undefined') {
    loggedIn = true;
  }

  console.log(window.localStorage.getItem('access_token'));
  console.log('loggedin: ' + loggedIn);

  const params = new URLSearchParams(window.location.search);
  if(params.get("code")) {
    code = params.get("code");
    loggedIn = true;
  }

  const [searchExecuted, setSearchExecuted] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const handleClick = async () => {
    if(!code) await Spotify.authorize();
  }

  const onSearch = async (term) => {
      await Spotify.getAccessToken(code);

      try {
        const results = await Spotify.search(term);
        setSearchResults(results);
        setSearchExecuted(true);
      } catch (error) {
        console.log('Error retrieving results: ' + error);
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

  let body = <button className="login" onClick={handleClick}>log in to spotify</button>;

  if (loggedIn) {
    body = (
      <>
        <SearchBar onSearch={onSearch} />
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
