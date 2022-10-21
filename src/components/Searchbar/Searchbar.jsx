import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, SearchBarStyled } from './Searchbar.styled';
import { IconButton } from 'components/IconButton/IconButton';
import { ReactComponent as IconSearch } from '../../icons/search.svg';

export class SearchBar extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const query = this.state.query.trim();
    if (!query) return alert('field cannot be empty');

    this.props.onSubmit(query);
    this.resetForm();
  };

  resetForm() {
    this.setState({ query: '' });
  }

  render() {
    const { query } = this.state;

    return (
      <SearchBarStyled>
        <Form onSubmit={this.handleSubmit}>
          <IconButton aria-label="search photo">
            <IconSearch width="40px" height="40px" />
          </IconButton>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            value={query}
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </Form>
      </SearchBarStyled>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
