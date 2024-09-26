import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

function SearchResults(props) {
  return (
    <div className="results-panel panel">
      <h3>results</h3>
      <TrackList tracks={props.tracks} onAdd={props.onAdd} />
    </div>
  );
}

export default SearchResults;
