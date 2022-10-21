import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Api } from 'components/services/Api';
import css from './ImageGallery.module.css';

const api = new Api();

const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
};

export class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: STATUS.idle,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (prevQuery !== nextQuery) {
      this.setState({ status: STATUS.pending });

      api
        .fetchImages(nextQuery)
        .then(images => {
          if (images.totalHits === 0) {
            throw new Error(
              'There are no images found for your request. Please, try again'
            );
          }
          this.setState({ images: images.hits, status: STATUS.resolved });
        })
        .catch(error => this.setState({ error, status: STATUS.rejected }));
    }
  }

  render() {
    const { images, status, error } = this.state;

    if (status === 'idle') {
      return <h2>Please, enter your request</h2>;
    }

    if (status === 'pending') {
      return <h2>Pending...........</h2>;
    }

    if (status === 'rejected') {
      return <h2>{error.message}</h2>;
    }

    if (status === 'resolved') {
      return (
        <ul className={css.imageGallery}>
          <h2>This is images from API</h2>
          {images.map(image => {
            console.log('image', image);
            return <ImageGalleryItem key={image.id} />;
          })}
        </ul>
      );
    }
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
