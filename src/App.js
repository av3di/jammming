import './App.css';
import tracks from './tracks';
import TrackList from './components/TrackList/TrackList';
import Playlist from './components/Playlist/Playlist';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>jammming</h1>
      </header>
      <div className="main-panel">
        <TrackList tracks={tracks} />
        <Playlist />
      </div>
    </div>
  );
}

export default App;
