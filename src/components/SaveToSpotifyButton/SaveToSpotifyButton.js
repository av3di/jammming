import React from 'react';
import './SaveToSpotifyButton.css';

function SaveToSpotifyButton(props) {
  const handleClick = () => {
    props.onSave();
  }
  return (
    <div>
      <button onClick={handleClick} disabled={props.disable}>save playlist to spotify</button>
    </div>
  );
}

export default SaveToSpotifyButton;
