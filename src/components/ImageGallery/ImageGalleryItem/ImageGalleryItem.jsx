import PropTypes from 'prop-types';

//========== styles ==========
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem ({getImageData, photoData: {largeImageURL, webformatURL, tags}}) {
    return <li className={css.ImageGalleryItem} >
        <a
            href={largeImageURL}
            data-alt={tags}
            onClick={getImageData}>
            <img
                className={css.ImageGalleryItemImage}
                src={webformatURL}
                alt={tags} />
        </a>
    </li>;
};

ImageGalleryItem.propTypes = {
    getImageData: PropTypes.func.isRequired,
    photoData: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }),
};

// class ImageGalleryItem extends Component {
//     static propTypes = {
//             getImageData: PropTypes.func.isRequired,
//             openModal: PropTypes.func.isRequired,
//             photoData: PropTypes.shape({
//                 largeImageURL: PropTypes.string.isRequired,
//                 webformatURL: PropTypes.string.isRequired,
//                 tags: PropTypes.string.isRequired,
//             }),
//     }
    
//     handleImageClick = (event) => {
//         event.preventDefault();

//         const modalImageData = {
//             url: event.currentTarget.href,
//             alt: event.currentTarget.dataset.alt,
//         }

//         this.props.getImageData(modalImageData);
//         this.props.openModal();
//     }
    
//     render() {
//         const imageData = this.props.photoData;

//         return <li className={css.ImageGalleryItem} >
//             <a
//                 href={imageData.largeImageURL}
//                 data-alt={imageData.tags}
//                 onClick={this.handleImageClick}>
//                 <img
//                     className={css.ImageGalleryItemImage}
//                     src={imageData.webformatURL}
//                     alt={imageData.tags} />
//             </a>
//         </li>;
//     };
// };

// export { ImageGalleryItem };
