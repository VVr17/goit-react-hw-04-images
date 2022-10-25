import React, { Component } from 'react';
import { Api } from 'components/services/Api';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { SearchBar } from 'components/Searchbar/Searchbar';
import css from './App.module.css';

const api = new Api();

const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
};

export class App extends Component {
  state = {
    page: 1,
    query: '',
    images: [],
    error: null,
    loadBtnIsShown: false,
    status: STATUS.idle,
  };

  async componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: STATUS.pending, loadBtnIsShown: false });
      try {
        const images = await api.fetchImages(nextQuery, nextPage);
        if (images.totalHits === 0) {
          throw new Error(
            'There are no images found for your request. Please, try again'
          );
        }

        const remainingPages = this.getRemainingPages(images.totalHits);
        if (remainingPages > 0) this.setState({ loadBtnIsShown: true });

        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          status: STATUS.resolved,
        }));
      } catch (error) {
        this.setState({ error, status: STATUS.rejected });
      }
    }
  }

  onFormSubmit = query => {
    this.setState({ page: 1, query, images: [] });
  };

  onLoadBtnClick = event => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  getRemainingPages = totalImages => {
    return Math.ceil(totalImages / api.perPage) - this.state.page;
  };

  render() {
    const { images, status, error, loadBtnIsShown } = this.state;

    return (
      <div className={css.app}>
        <SearchBar
          onSubmit={this.onFormSubmit}
          isSubmitting={status === STATUS.pending}
        />

        {status === 'idle' && (
          <p className={css.text}>Please, enter your request</p>
        )}

        {(status === 'pending' || status === 'resolved') && (
          <ImageGallery images={images} />
        )}

        {status === 'pending' && <Loader />}

        {loadBtnIsShown && (
          <Button onClick={this.onLoadBtnClick}>Load More</Button>
        )}

        {status === 'rejected' && <p className={css.text}>{error.message}</p>}
      </div>
    );
  }
}
