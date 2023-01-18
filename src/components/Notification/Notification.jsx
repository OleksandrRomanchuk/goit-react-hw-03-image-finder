import PropTypes from 'prop-types';

//========== styles ==========
import css from './Notification.module.css';

export function Notification({ message }) {
    return <p className={css.NotifyMessage}>{message}</p>;
};

Notification.propTypes = {
    message: PropTypes.string.isRequired,
}