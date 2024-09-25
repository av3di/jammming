import React, {useState} from 'react';
import './Playlist.css';
import SaveToSpotifyButton from '../SaveToSpotifyButton/SaveToSpotifyButton';

function Playlist() {
  const [name, setName]  = useState('');
  const [tracks, setTracks] = useState([]);

  const handleChange = ({target}) => setName(target.value);

  return (
    <div className="panel">
      <h3>playlist</h3>
      <input placeholder="Playlist Name"
        type="text"
        value={name}
        onChange={handleChange}
      />
      <SaveToSpotifyButton />
    </div>
  );
}

export default Playlist;
