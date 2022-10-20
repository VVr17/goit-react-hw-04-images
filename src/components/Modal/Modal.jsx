import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalStyled, Overlay } from './Modal.styled';

export class Modal extends Component {
  render() {
    return (
      <Overlay>
        <ModalStyled />
      </Overlay>
    );
  }
}

Modal.propTypes = {};
