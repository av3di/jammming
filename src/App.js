import React, {useState} from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import tracksResults from './tracks';
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

  const tracksResults2 = [];
  console.log(window.localStorage.getItem('access_token'));
  console.log('loggedin: ' + loggedIn);

  const params = new URLSearchParams(window.location.search);
  if(params.get("code")) {
    code = params.get("code");
    loggedIn = true;
  }

  const handleClick = async () => {
    if(!code) await Spotify.authorize();
  }

  const onSearch = async () => {
      await Spotify.getAccessToken(code);
      console.log('back in app');
      Spotify.search();
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
        {tracksResults2.length > 0 && (
          <div className="main-panel">
            <SearchResults tracks={tracksResults} onAdd={addTrack} />
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
