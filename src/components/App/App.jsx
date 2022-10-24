import React, { Component } from 'react';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { ThreeDots } from 'react-loader-spinner';
import css from './App.module.css';
import { Api } from 'components/services/Api';
const api = new Api();

const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
};

export class App extends Component {
  state = {
    query: '',
    images: [],
    error: null,
    status: STATUS.idle,
  };

  async componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;

    if (prevQuery !== nextQuery) {
      this.setState({ status: STATUS.pending });
      try {
        const images = await api.fetchImages(nextQuery);
        if (images.totalHits === 0) {
          throw new Error(
            'There are no images found for your request. Please, try again'
          );
        }
        this.setState({ images: images.hits, status: STATUS.resolved });
      } catch (error) {
        this.setState({ error, status: STATUS.rejected });
      }
    }
  }

  onFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    const { images, status, error } = this.state;

    return (
      <main className={css.app}>
        <SearchBar
          onSubmit={this.onFormSubmit}
          isPending={status === STATUS.pending}
        />

        {status === 'idle' && (
          <p className={css.text}>Please, enter your request</p>
        )}
        {status === 'pending' && (
          <div className={css.spinner}>
            <ThreeDots color="#3f51b5" ariaLabel="three-dots-loading" />
          </div>
        )}
        {status === 'rejected' && <p className={css.text}>{error.message}</p>}
        {status === 'resolved' && (
          <>
            <ImageGallery images={images} />
            <Button>Load More</Button>
          </>
        )}
      </main>
    );
  }
}
