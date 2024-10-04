import React from 'react';

function SearchResultsPrevButton(props) {
  const handleClick = () => {
    props.getResults(props.prevResultsUrl);
  };
  return <button onClick={handleClick}
          disabled={props.prevResultsUrl === null || props.prevResultsUrl.length === 0}>previous</button>
}

export default SearchResultsPrevButton;
