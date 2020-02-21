import React from 'react';

const SearchBar = ({ onSubmit, onChange, searchTerm }) => {
  return (
    <form className="ui form" onSubmit={onSubmit}>
      <div className="field">
        <div className="ui icon input" id="search">
          <input
            type="text"
            onChange={onChange}
            placeholder="Search..."
            value={searchTerm}
          ></input>
          <i className="circular search link icon"></i>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
