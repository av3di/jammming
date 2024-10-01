import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';
import SaveToSpotifyButton from '../SaveToSpotifyButton/SaveToSpotifyButton';

const MIN_WINDOW_WIDTH = 820; // corresponds to .main-panel flex-wrap

function Playlist(props) {
  const handleChange = ({target}) => props.setName(target.value);

  // instructional placeholder
  let placeholder;
  if (props.tracks.length === 0) {
    let arrow = '^';
    if (window.innerWidth >= MIN_WINDOW_WIDTH) arrow = '<-';

    const placeholderText = `${arrow} add any tracks, name the playlist, then click 'save' when you're done`;
    placeholder = <p className="placeholder">{placeholderText}</p>;
  }

  return (
    <div className="playlist-panel panel">
      <h3>playlist</h3>
      <input placeholder="Playlist Name"
        type="text"
        value={props.name}
        onChange={handleChange}
      />
      {placeholder}
      <TrackList
          tracks={props.tracks}
          onRemove={props.onRemove}
      />
      <SaveToSpotifyButton onSave={props.onSave} disable={props.name.length === 0}/>
      <p className="playlist-error">{ props.error }</p>
      <p className="playlist-success">{ props.success }</p>
    </div>
  );
}

export default Playlist;
