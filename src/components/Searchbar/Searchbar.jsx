import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'components/IconButton/IconButton';
import { ReactComponent as IconSearch } from '../../icons/search.svg';
import css from './Searchbar.module.css';

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
    if (!query) return alert('Field cannot be empty');

    this.props.onSubmit(query);
    this.resetForm();
  };

  resetForm() {
    this.setState({ query: '' });
  }

  render() {
    const { query } = this.state;
    const { isSubmitting } = this.props;

    return (
      <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <IconButton aria-label="submit search query" disabled={isSubmitting}>
            <IconSearch width="40px" height="40px" />
          </IconButton>
          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            value={query}
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};
