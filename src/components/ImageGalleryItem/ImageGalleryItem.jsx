import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageItemStyled } from './ImageGalleryItem.styled';

export const ImageGalleryItem = () => {
  return (
    <ImageItemStyled>
      <p>this is image item</p>
    </ImageItemStyled>
  );
};

ImageGalleryItem.propTypes = {};
