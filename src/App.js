import logo from './logo.svg';
import './App.css';
import tracks from './tracks';
import TrackList from './components/TrackList/TrackList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <TrackList tracks={tracks} />
    </div>
  );
}

export default App;
