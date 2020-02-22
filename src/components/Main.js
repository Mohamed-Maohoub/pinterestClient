import React from 'react';
import Navbar from './Navbar';
import Homepage from '../pages/Homepage';

const Main = ({
  images,
  loadMore,
  hasMore,
  onSubmit,
  onChange,
  searchTerm,
  serverError
}) => {
  let renderedElement=''
  if( serverError.exist){
     renderedElement =<div className="errorDiv"><h1>{serverError.message}</h1></div>
  }
    
  return (
    <div>
      <Navbar
        onSubmit={onSubmit}
        onChange={onChange}
        searchTerm={searchTerm}
      ></Navbar>
<Homepage images={images} loadMore={loadMore} hasMore={hasMore}></Homepage>
      {renderedElement}
    </div>
  );
};

export default Main;
