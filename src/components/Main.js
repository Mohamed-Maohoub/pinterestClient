import React from 'react';
import Navbar from './Navbar';
import Homepage from '../pages/Homepage';

const Main = ({
  images,
  loadMore,
  hasMore,
  onSubmit,
  onChange,
  searchTerm
}) => {
  return (
    <div>
      <Navbar
        onSubmit={onSubmit}
        onChange={onChange}
        searchTerm={searchTerm}
      ></Navbar>

      <Homepage
        images={images}
        loadMore={loadMore}
        hasMore={hasMore}
      ></Homepage>
    </div>
  );
};

export default Main;
