import React from 'react';
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
    <div>
      <h1>TrackList</h1>
      {trackElements}
    </div>
  );
}

export default TrackList;
