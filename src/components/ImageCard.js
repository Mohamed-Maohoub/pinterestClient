import React from 'react';
import uniqid from 'uniqid';
const ImageCard = ({ login, id, avatar_url }) => {
  return (
    <div key={uniqid()}>
      <img className="imageCard" alt={login} src={avatar_url} key={uniqid()} />
    </div>
  );
};

export default ImageCard;


import React, { Component } from 'react'
import PropTypes from 'prop-types'


