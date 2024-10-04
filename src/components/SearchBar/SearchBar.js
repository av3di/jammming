import React, {useState} from 'react';
import './SearchBar.css';

function SearchBar(props) {
  const [term, setTerm] = useState('');
  const [prevTerm, setPrevTerm] = useState('');

  const handleChange = ({target}) => {
    setPrevTerm(term);
    setTerm(target.value);
  };

  const canSearch = () => {
    return term.length > 0
            && !props.searchInProgress
  };

  const handleClick = () => {
    if (term !== prevTerm) {
      setPrevTerm(term);
      props.onSearch(term);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && canSearch() && term !== prevTerm) {
      setPrevTerm(term);
      props.onSearch(term);
    }
  };

  return (
    <div className="search-panel" onKeyDown={handleKeyDown}>
      <input type="text"
        value={term}
        className="search-box"
        placeholder="Search for songs"
        onChange={handleChange}
      />
      <button className="search-button" onClick={handleClick} disabled={!canSearch()}>search</button>
    </div>
  );
}

export default SearchBar;
