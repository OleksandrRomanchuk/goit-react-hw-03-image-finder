import PropTypes from 'prop-types';

//========== components ==========
import { Component } from 'react';
import { FcSearch } from "react-icons/fc";

//========== styles ==========
import css from './Searchbar.module.css';

class Searchbar extends Component {
    static propTypes = {
            onSubmit: PropTypes.func.isRequired,
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        const query = event.target.elements.query.value;

        this.props.onSubmit(query);
    }

    render() {
        return <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onFormSubmit}>
                <button type="submit" className={css.SearchFormBtn}>
                    <FcSearch style={{fontSize: "24px"}} />
                <span className={css.SearchFormBtnLabel}>Search</span>
            </button>
            <input
                className={css.SearchFormInput}
                name="query"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
            />
        </form>
    </header>;
    }
};

export { Searchbar };