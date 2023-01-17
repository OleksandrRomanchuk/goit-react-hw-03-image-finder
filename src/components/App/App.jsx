import { fetchImages } from 'API/API';

//========== components ==========
import { Component } from 'react';
import { FallingLines } from 'react-loader-spinner';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

//========== styles ==========
import css from './App.module.css';

class App extends Component {
  state = {
    photos: [],
    page: 1,
    query: null,
    isModal: false,
    largeImage: null,
    status: 'pending',
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.setState({status: 'pending'})
      try {
        const page = this.state.page;
        const query = this.state.query;;

        const response = await fetchImages(query, page);
        
        this.setState(prevState => ({ photos: [...prevState.photos, ...response.hits], status: ''}));
      } catch (error) {
        console.log(error);
      };
    };
  };

  setNextPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  setQuery = (string) => {
    this.setState({ photos: [], query: string, page: 1});
  }

  toggleModal = () => {
    this.setState(prevState => ({ isModal: !prevState.isModal }));
  }

  setChosenImage = (imageData) => {
    this.setState({largeImage: imageData})
  }

  render() {
    const photos = this.state.photos;
    const largeImageData = this.state.largeImage;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.setQuery} />
        {photos[0] && <>
          <ImageGallery
            items={photos}
            modalOpen={this.toggleModal}
            getImageData={this.setChosenImage} />
          {this.state.status === 'pending'
            ? <div className={css.Loader}>
              <FallingLines
                color="#3f51b5"
                width="100"
                visible={true}
                ariaLabel='falling-lines-loading'
              />
            </div> : <Button
              type="button"
              label="Load more"
              changePageNumber={this.setNextPage} />}
        </>}          
        {this.state.isModal
          && <Modal
            modalToggle={this.toggleModal}>
            <img
              src={largeImageData.url}
              alt={largeImageData.alt} />
          </Modal>}
      </div>
    );
  };
};

export { App };
