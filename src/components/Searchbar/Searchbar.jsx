import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Label, SearchBarStyled } from './Searchbar.styled';
import { IconButton } from 'components/IconButton/IconButton';
import { ReactComponent as IconSearch } from '../../icons/search.svg';

export class SearchBar extends Component {
  render() {
    return (
      <SearchBarStyled>
        <Form>
          <IconButton aria-label="search photo">
            <IconSearch width="40px" height="40px" />
          </IconButton>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </SearchBarStyled>
    );
  }
}

SearchBar.propTypes = {};
