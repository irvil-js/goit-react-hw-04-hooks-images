import React, { Component } from 'react';
import SearchBar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import AppLoader from './components/Loader';
import fetchImages from './services/api-service';
import styles from './App.module.css';

class App extends Component {
  state = {
    images: [],
    showModal: false,
    currentPage: 1,
    searchQuery: '',
    largeImg: '',
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.fetchImages();
    }
  }

  onOpenModal = ({ target }) => {
    const largeImgUrl = target.dataset.src;

    this.setState({
      showModal: true,
      largeImg: largeImgUrl,
    });
  };

  onCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  onChangeQuery = query => {
    this.setState({
      images: [],
      searchQuery: query,
      currentPage: 1,
      error: null,
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = {
      searchQuery,
      currentPage,
    };

    this.setState({ isLoading: true });

    fetchImages(options)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          currentPage: (prevState.currentPage += 1),
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  render() {
    const { images, showModal, isLoading, largeImg } = this.state;
    const { onOpenModal, onCloseModal, onChangeQuery, fetchImages } = this;

    return (
      <div className={styles.App}>
        <SearchBar onSubmit={onChangeQuery} />
        {!isLoading && <ImageGallery onClick={onOpenModal} images={images} />}
        {images.length > 0 && !isLoading && <Button onClick={fetchImages} />}
        {isLoading && <AppLoader />}
        {showModal && <Modal onClose={onCloseModal} largeImg={largeImg} />}
      </div>
    );
  }
}

export default App;
