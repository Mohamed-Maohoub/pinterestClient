import React, { Suspense, lazy } from 'react';
const ImageList = lazy(() => import('../components/ImageList'));

const Homepage = ({ images, loadMore, hasMore }) => {
  return (
    <div id="container">
      <Suspense
        fallback={<div className="ui active centered inline loader"></div>}
      >
        <ImageList
          images={images}
          loadMore={loadMore}
          hasMore={hasMore}
        ></ImageList>
      </Suspense>
    </div>
  );
};

export default Homepage;
