import React, {useState} from 'react';
import TrackList from '../TrackList/TrackList';
import SaveToSpotifyButton from '../SaveToSpotifyButton/SaveToSpotifyButton';

function Playlist(props) {


  const handleChange = ({target}) => props.setName(target.value);

  return (
    <div className="panel">
      <h3>playlist</h3>
      <input placeholder="Playlist Name"
        type="text"
        value={props.name}
        onChange={handleChange}
      />
      <TrackList
        tracks={props.tracks}
        onRemove={props.onRemove}
      />
      <SaveToSpotifyButton />
    </div>
  );
}

export default Playlist;
