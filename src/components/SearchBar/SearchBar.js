import React from 'react';
import './SearchBar.css';

function SearchBar() {
  return (
    <div className="search-panel">
      <input type="text"
        className="search-box"
        placeholder="Search for songs, artists, etc"
      />
      <button className="search-button">search</button>
    </div>
  );
}

export default SearchBar;
