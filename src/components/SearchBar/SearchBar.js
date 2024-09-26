import React from 'react';
import './SearchBar.css';

function SearchBar() {
  return (
    <div className="search-panel">
      <input type="text"
        className="search-box"
        placeholder="Search for songs, artists, etc"
      />
      <button>search</button>
    </div>
  );
}

export default SearchBar;
