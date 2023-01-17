import PropTypes from 'prop-types';

//========== styles ==========
import css from './Button.module.css';

export function Button({type, label, changePageNumber}) {
    return <button className={css.Button} type={type} onClick={changePageNumber}>{label}</button>;
};

Button.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    changePageNumber: PropTypes.func.isRequired,
}