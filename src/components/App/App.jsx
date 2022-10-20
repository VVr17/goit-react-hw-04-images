import { IconButton } from 'components/IconButton/IconButton';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { SearchBar } from 'components/Searchbar/Searchbar';
import React, { Component } from 'react';
import { Container } from './App.styled';

export class App extends Component {
  render() {
    return (
      <Container>
        <SearchBar />
        <ImageGallery />
      </Container>
    );
  }
}
