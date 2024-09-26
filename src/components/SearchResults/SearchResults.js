import React from 'react';
import './Results.css';
import TrackList from '../TrackList/TrackList';

function Results(props) {
  return (
    <div className="results-panel panel">
      <h3>results</h3>
      <TrackList tracks={props.tracks} onAdd={props.onAdd} />
    </div>
  );
}

export default Results;
