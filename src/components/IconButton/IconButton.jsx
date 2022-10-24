// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { IconButtonStyled } from './IconButton.styled';
import css from './IconButton.module.css';

export const IconButton = ({ children, ...allyProps }) => {
  return (
    <button
      className={css.searchFormButton}
      type="submit"
      aria-label="submit search query"
      {...allyProps}
    >
      {children}
    </button>
  );
};

// IconButton.propTypes = {};
