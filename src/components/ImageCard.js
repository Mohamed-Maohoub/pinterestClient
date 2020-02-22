import React from 'react';
import uniqid from 'uniqid';

const ImageCard = ({ login, avatar_url }) => {
  const onload = () => {
    
  };

  return (
    <img
      alt={login}
      src={avatar_url}
      key={uniqid()}
      onLoad={onload}
      style={{
        width: '100%',
        height: 'fit-content',
        borderRadius: '30px'
      }}
    />
  );
};

export default ImageCard;
