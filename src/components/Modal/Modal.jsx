import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

//========== components ==========
import { Component } from 'react';

//========== styles ==========
import css from './Modal.module.css';

const modalPortal = document.getElementById('modal-root');

class Modal extends Component {
    static propTypes = {
        [this.props]: PropTypes.shape({
            modalToggle: PropTypes.func.isRequired,
            children: PropTypes.node.isRequired,
        }),
    };

    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown)
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown)
    };

    onKeyDown = (event) => {
        if (event.code === 'Escape') {
            this.props.modalToggle();
        };
    };

    onModalOpen = (event) => {
        if (event.target.nodeName !== 'IMG') {
            this.props.modalToggle();
        };
    };

    render() {
        return createPortal(<div className={css.Overlay} onClick={this.onModalOpen}>
            <div className={css.Modal}>{this.props.children}</div>
        </div>, modalPortal);
    };
};

export { Modal };