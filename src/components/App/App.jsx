import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { SearchBar } from 'components/Searchbar/Searchbar';
import React, { Component } from 'react';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    query: '',
  };

  onFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    const { query } = this.state;

    return (
      <Container>
        <SearchBar onSubmit={this.onFormSubmit} />
        <ImageGallery query={query} />
        <Button>Load More</Button>
      </Container>
    );
  }
}
