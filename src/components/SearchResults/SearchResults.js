import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

function SearchResults(props) {
  const noResults = <p className="no-results">no results</p>;
  return (
    <div className="panel">
      <h3>results</h3>
      {props.tracks.length === 0 && noResults}
      <TrackList tracks={props.tracks} onAdd={props.onAdd} />
    </div>
  );
}

export default SearchResults;
