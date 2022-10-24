import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') this.props.closeModal();
  };

  handleBackdrop = event => {
    if (event.target === event.currentTarget) this.props.closeModal();
  };

  render() {
    const { children } = this.props;

    return createPortal(
      <div className={css.overlay} onClick={this.handleBackdrop}>
        <div className={css.modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}
