import React from 'react';

function Track(props) {
  return (
    <div>
      <h1>{props.songName}</h1>
      <h2>{props.artist}</h2>
      <h3>{props.album}</h3>
    </div>
  );
}

export default Track;
