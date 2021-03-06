import React, { Suspense, lazy } from 'react';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroller';

const ImageCard = lazy(() => import('./ImageCard'));

const ImageList = ({ images, loadMore, hasMore }) => {

  // To change number of  columns  with screen width  
  const breakpointColumnsObj = {  
    default: 6,
    1200: 5,
    700: 3,
    500: 2
  };

  const childElements = images.map(({ login, avatar_url,_id }) => {
    
    return (
      <div key={_id}>
        <Suspense
          fallback={
            <div
              style={{
                height: '300px',
                backgroundColor: 'Gainsboro',
                borderRadius: '30px'
              }}
            >
              <div></div>
            </div>
          }
        >
          <ImageCard login={login} avatar_url={avatar_url}></ImageCard>
        </Suspense>
      </div>
    );
  });

  return (
    <div>
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <div key='1' className="loader">
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
