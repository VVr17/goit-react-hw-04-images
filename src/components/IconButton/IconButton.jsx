// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { IconButtonStyled } from './IconButton.styled';
import css from './IconButton.module.css';

// ! add aria-label

export const IconButton = ({ children }) => {
  return <button className={css.searchFormButton}>{children}</button>;
};

// IconButton.propTypes = {};
