import { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'components/IconButton/IconButton';
import { ReactComponent as IconSearch } from '../../icons/search.svg';
import css from './Searchbar.module.css';

export const SearchBar = ({ isSubmitting, onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => setQuery(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    if (!query.trim()) return alert('Field cannot be empty');

    onSubmit(query.trim());
    setQuery('');
  };

  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <IconButton aria-label="submit search query" disabled={isSubmitting}>
          <IconSearch width="40px" height="40px" />
        </IconButton>
        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          value={query}
          onChange={handleChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};
