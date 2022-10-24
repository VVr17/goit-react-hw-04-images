import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ previewImage, tags }) => {
  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItemImage}
        src={previewImage}
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  previewImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
