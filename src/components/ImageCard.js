import React from 'react';
import uniqid from 'uniqid';

const ImageCard = ({ login, avatar_url, onLoad }) => {
  return (
    <img
      alt={login}
      src={avatar_url}
      key={uniqid()}
      style={{
        width: '100%',
        height: 'fit-content',
        borderRadius: '30px'
      }}
    />
  );
};

export default ImageCard;
