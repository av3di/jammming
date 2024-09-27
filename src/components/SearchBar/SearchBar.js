import React, {useState} from 'react';
import './SearchBar.css';

function SearchBar(props) {
  const [term, setTerm] = useState('');

  const handleChange = ({target}) => setTerm(target.value);
  const handleClick = () => {
    props.onSearch(term);
  }

  return (
    <div className="search-panel">
      <input type="text"
        value={term}
        className="search-box"
        placeholder="Search for songs"
        onChange={handleChange}
      />
      <button className="search-button" onClick={handleClick}>search</button>
    </div>
  );
}

export default SearchBar;
