import React, {useState} from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import tracksResults from './tracks';
import Playlist from './components/Playlist/Playlist';
import SearchResults from './components/SearchResults/SearchResults';
import Spotify from './util/Spotify';
let code = '';

function App() {
  // const loggedIn = !!window.localStorage.getItem('access_token');
  const loggedIn = false;

  const params = new URLSearchParams(window.location.search);
  if(params.get("code")) code = params.get("code");

  const handleClick = async () => {
    if(!code) await Spotify.authorize();

    let accessToken = '';
    if (code) accessToken = await Spotify.getAccessToken(code);
    loggedIn = true;
  }

  const [playlistName, setPlaylistName]  = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = (track) => {
    setPlaylistTracks(prev => [...prev, track]);
  };

  const removeTrack = ({id}) => {
    setPlaylistTracks((prev) => prev.filter(track => track.id !== id));
  }

  let body = <button className="login">log in to spotify</button>;
  if (loggedIn) {
    body = (
      <>
        <SearchBar />
        <div className="main-panel">
          <SearchResults tracks={tracksResults} onAdd={addTrack} />
          <Playlist
            tracks={playlistTracks}
            onRemove={removeTrack}
            name={playlistName}
            setName={setPlaylistName}
          />
        </div>
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
