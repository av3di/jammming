import React from 'react';

function SearchResultsNextButton(props) {
  const handleClick = () => {
    props.getNextResults();
  };
  return <button onClick={handleClick}
          disabled={props.nextResultsUrl === null}>next</button>
}

export default SearchResultsNextButton;
