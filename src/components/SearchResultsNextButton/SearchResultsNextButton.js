import React from 'react';

function SearchResultsNextButton(props) {
  const handleClick = () => {
    props.getResults(props.nextResultsUrl);
  };
  return <button onClick={handleClick}
          disabled={props.nextResultsUrl === null || props.nextResultsUrl.length === 0}>next</button>
}

export default SearchResultsNextButton;
