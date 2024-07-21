
import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      onSearch(event.target.value);
    }
  };

  return (
    <input
      type="text"
      placeholder="Search for books..."
      onKeyDown={handleSearch}
      style={{ width: '100%', padding: '20px', fontSize: '16px' ,alignSelf:'center'}}
    />
  );
};

export default SearchBar;
