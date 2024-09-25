import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

function TrackList(props) {
  const trackElements = props.tracks.map((track, index) => {
    return <Track key={index}
        songName={track.songName}
        artist={track.artist}
        album={track.album}
      />
  });

  return (
    <div className="tracklist-container">
      <h3>results</h3>
      <div className="tracks-container">
        {trackElements}
      </div>
    </div>
  );
}

export default TrackList;
