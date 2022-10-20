import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    return (
      <ImageGalleryList>
        <ImageGalleryItem />
      </ImageGalleryList>
    );
  }
}

ImageGallery.propTypes = {};
