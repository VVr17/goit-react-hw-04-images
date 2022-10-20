import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButtonStyled } from './IconButton.styled';

export const IconButton = ({ children }) => {
  return <IconButtonStyled>{children}</IconButtonStyled>;
};

IconButton.propTypes = {};
