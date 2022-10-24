import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    ModalIsOpen: false,
  };

  openModal = () => {
    this.setState({ ModalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ ModalIsOpen: false });
  };

  render() {
    const { previewImage, largeImage, tags } = this.props;
    const { ModalIsOpen } = this.state;

    return (
      <>
        <li className={css.imageGalleryItem} onClick={this.openModal}>
          <img
            className={css.imageGalleryItemImage}
            src={previewImage}
            alt={tags}
          />
        </li>
        {ModalIsOpen && (
          <Modal closeModal={this.closeModal}>
            <img src={largeImage} alt={tags} />
            <p className={css.imageTitle}>{tags}</p>
          </Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  previewImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
