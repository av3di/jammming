import React from 'react';
import './Track.css';

function Track(props) {
  return (
    <div className="track-container">
      <p className="song-name">{props.songName}</p>
      <div className="song-info">
        <p className="artist">by: <span className="values">{props.artist}</span></p>
        <p className="album">for: <span className="values">{props.album}</span></p>
      </div>
    </div>
  );
}

export default Track;
