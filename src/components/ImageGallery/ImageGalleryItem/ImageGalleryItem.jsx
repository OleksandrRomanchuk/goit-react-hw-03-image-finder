import PropTypes from 'prop-types';

//========== components ==========
import { Component } from 'react';

//========== styles ==========
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
    static propTypes = {
        [this.props]: PropTypes.shape({
            getImageData: PropTypes.func.isRequired,
            openModal: PropTypes.func.isRequired,
            photoData: PropTypes.shape({
                largeImageURL: PropTypes.string.isRequired,
                webformatURL: PropTypes.string.isRequired,
                tags: PropTypes.string.isRequired,
            }),
        }),
    }
    
    handleImageClick = (event) => {
        event.preventDefault();

        const modalImageData = {
            url: event.currentTarget.href,
            alt: event.currentTarget.dataset.alt,
        }

        this.props.getImageData(modalImageData);
        this.props.openModal();
    }
    
    render() {
        const imageData = this.props.photoData;

        return <li className={css.ImageGalleryItem} >
            <a
                href={imageData.largeImageURL}
                data-alt={imageData.tags}
                onClick={this.handleImageClick}>
                <img
                    className={css.ImageGalleryItemImage}
                    src={imageData.webformatURL}
                    alt={imageData.tags} />
            </a>
        </li>;
    };
};

export { ImageGalleryItem };
