import React from 'react';
import Track from '../Track/Track';

function TrackList(props) {
  const trackElements = props.tracks.map((track, index) => {
    return <Track key={index}
        track={track}
        limitReached={props.limitReached}
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
