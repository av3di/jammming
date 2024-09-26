import React from 'react';
import Track from '../Track/Track';

function TrackList(props) {
  const trackElements = props.tracks.map((track, index) => {
    return <Track key={index}
        songName={track.songName}
        artist={track.artist}
        album={track.album}
        onAdd={props.onAdd}
      />
  });

  return (
      <div className="tracks-container">
        {trackElements}
      </div>
  );
}

export default TrackList;
