import React, {useState} from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import tracksResults from './tracks';
import Playlist from './components/Playlist/Playlist';
import SearchResults from './components/SearchResults/SearchResults';
import Spotify from './util/Spotify';
let test = '';
let code = '';

function App() {

  const params = new URLSearchParams(window.location.search);
  if(params.get("error")) console.log('you need to give access');
  if(params.get("code")) code = params.get("code");

  const handleClick = async () => {
    console.log('calling authorize');
    if(!code) await Spotify.authorize();
    console.log('after auth in app');
    console.log(code);
    let accessToken = '';
    if (code) accessToken = await Spotify.getAccessToken(code);
    console.log('accessToken:')
    console.log(accessToken);
    test = accessToken;
  }

  const handleAK = () => {
    console.log('access::');
    console.log(test);
  }
  const [playlistName, setPlaylistName]  = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = (track) => {
    setPlaylistTracks(prev => [...prev, track]);
  };

  const removeTrack = ({id}) => {
    setPlaylistTracks((prev) => prev.filter(track => track.id !== id));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 onClick={handleClick}>jammming</h1>
      </header>
      <SearchBar />
      <button onClick={handleAK}>AK</button>
      <div className="main-panel">
        <SearchResults tracks={tracksResults} onAdd={addTrack} />
        <Playlist
          tracks={playlistTracks}
          onRemove={removeTrack}
          name={playlistName}
          setName={setPlaylistName}
        />
      </div>
    </div>
  );
}

export default App;
