import React from 'react';
import SearchBar from './SearchBar';

const Navbar = ({ onSubmit, onChange, searchTerm }) => {
  return (
    <div className="ui segment " style={{ backgroundColor: 'DimGray' }}>
      <div className="pinterentIcon">
        <SearchBar
          onSubmit={onSubmit}
          onChange={onChange}
          searchTerm={searchTerm}
        ></SearchBar>
      </div>
    </div>
  );
};

export default Navbar;
