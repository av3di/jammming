import React, {useState} from 'react';
import './App.css';
import tracksResults from './tracks';
import TrackList from './components/TrackList/TrackList';
import Playlist from './components/Playlist/Playlist';
import SearchResults from './components/SearchResults/SearchResults';

function App() {
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
        <h1>jammming</h1>
      </header>
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
