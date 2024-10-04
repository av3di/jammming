import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';
import SearchResultsNextButton from '../SearchResultsNextButton/SearchResultsNextButton';
import SearchResultsPrevButton from '../SearchResultsPrevButton/SearchResultsPrevButton';

function SearchResults(props) {
  const noResults = <p className="no-results">no results</p>;
  return (
    <div className="panel">
      <h3>results</h3>
      {props.tracks.length === 0 && noResults}
      <TrackList tracks={props.tracks}
        onAdd={props.onAdd}
        limitReached={props.limitReached}
      />
      <div className="pagination">
        <SearchResultsPrevButton
          getResults={props.getResults}
          prevResultsUrl={props.prevResultsUrl}
        />
        <SearchResultsNextButton
          getResults={props.getResults}
          nextResultsUrl={props.nextResultsUrl}
        />
      </div>
    </div>
  );
}

export default SearchResults;
