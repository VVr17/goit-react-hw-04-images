import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';
import { Api } from 'components/services/Api';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
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
      return <h2 className={css.galleryText}>Please, enter your request</h2>;
    }

    if (status === 'pending') {
      return (
        <div className={css.spinner}>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#3f51b5"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      );
    }

    if (status === 'rejected') {
      return <h2 className={css.galleryText}>{error.message}</h2>;
    }

    if (status === 'resolved') {
      return (
        <ul className={css.imageGallery}>
          {images.map(({ id, webformatURL, tags }) => (
            <ImageGalleryItem
              key={id}
              previewImage={webformatURL}
              tags={tags}
            />
          ))}
        </ul>
      );
    }
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
