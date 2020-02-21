import React from 'react';



import Masonry from 'react-masonry-css';
import uniqid from 'uniqid';
import InfiniteScroll from 'react-infinite-scroller';

const ImageList = ({ images, loadMore, hasMore }) => {
  const breakpointColumnsObj = {
    default: 6,
    1200: 5,
    700: 3,
    500: 2
  };
console.log(images)
  const childElements = images.map(({ login, avatar_url }) => {
    return (
      <div key={uniqid()}>
        <img
          id="imageCard"
          alt={login}
          src={avatar_url}
          key={uniqid()}
          style={{ width: '100%', height: 'fit-content' , borderRadius: '25px'}}
        />
      </div>
    );
  });

  return (
    <div>
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <div key={uniqid()} className="loader">
            {' '}
            Loading...{' '}
          </div>
        }
        useWindow={true}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {childElements}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
};

export default ImageList;
