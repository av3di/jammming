import './App.css';
import tracks from './tracks';
import TrackList from './components/TrackList/TrackList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>jammming</h1>
      </header>
      <TrackList tracks={tracks} />
    </div>
  );
}

export default App;
