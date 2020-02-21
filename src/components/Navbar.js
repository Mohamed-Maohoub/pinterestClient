import React from 'react';
import SearchBar from './SearchBar';

const Navbar = ({ onSubmit, onChange, searchTerm }) => {
  return (
    <div className="ui segment ">
      <div className="pinterentIcon">
        <img
          className="ui avatar image"
          src=""
          alt="logo"
        />

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
