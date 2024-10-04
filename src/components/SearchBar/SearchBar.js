import React, {useState} from 'react';
import './SearchBar.css';

function SearchBar(props) {
  const [term, setTerm] = useState('');

  const handleChange = ({target}) => setTerm(target.value);
  const handleClick = () => {
    props.onSearch(term);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && term.length > 0) {
        props.onSearch(term);
    }
  }

  return (
    <div className="search-panel" onKeyDown={handleKeyDown}>
      <input type="text"
        value={term}
        className="search-box"
        placeholder="Search for songs"
        onChange={handleChange}
      />
      <button className="search-button" onClick={handleClick} disabled={term.length === 0}>search</button>
    </div>
  );
}

export default SearchBar;
