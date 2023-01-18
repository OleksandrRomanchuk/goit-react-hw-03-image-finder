import { fetchImages } from 'API/API';

//========== components ==========
import { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Notification } from 'components/Notification/Notification';
import { Button } from 'components/Button/Button';
import { ThreeDots  } from 'react-loader-spinner';
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
    isLoading: false,
    notifyMessage: 'Enter a search query to get a photo.'
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.setState({ isLoading: true, notifyMessage: '' });

      try {
        const page = this.state.page;
        const query = this.state.query;;

        const { hits } = await fetchImages(query, page);
        
        if (hits.length === 0) {
          this.setState({ notifyMessage: 'No photos were found for your request.' });
        }
        
        this.setState(prevState => ({ photos: [...prevState.photos, ...hits], isLoading: false}));
      } catch (error) {
        console.log(error);
      };
    };
    document.body.scrollIntoView({behavior: "smooth", block: "end"});
  };

  setNextPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  setQuery = (string) => {
    this.setState({ photos: [], query: string, page: 1 });
  };

  toggleModal = () => {
    this.setState(prevState => ({ isModal: !prevState.isModal }));
  };

  setChosenImage = (imageData) => {
    this.setState({ largeImage: imageData })
  };

  render() {
    const photos = this.state.photos;
    const largeImageData = this.state.largeImage;
    const loading = this.state.isLoading;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.setQuery} />
        {photos[0] ? <>
          <ImageGallery
            items={photos}
            modalOpen={this.toggleModal}
            getImageData={this.setChosenImage} />
          {!loading && <Button
            type="button"
            label="Load more"
            changePageNumber={this.setNextPage} />}
        </> : <Notification message={this.state.notifyMessage} />}
        {loading && <div className={css.Loader}>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>}

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
