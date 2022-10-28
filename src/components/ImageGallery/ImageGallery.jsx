import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = forwardRef(({ images }, ref) => {
  return (
    <ul className={css.imageGallery} ref={ref}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          previewImage={webformatURL}
          tags={tags}
          largeImage={largeImageURL}
        />
      ))}
    </ul>
  );
});

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
