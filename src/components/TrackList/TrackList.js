import React from 'react';
import Track from '../Track/Track';

function TrackList(props) {
  const trackElements = props.tracks.map((track) => {
    return <Track key={track.id}
        track={track}
        onAdd={props.onAdd}
        onRemove={props.onRemove}
      />
  });

  return (
      <div className="tracks-container">
        {trackElements}
      </div>
  );
}

export default TrackList;
