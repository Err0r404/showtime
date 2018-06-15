import React from 'react';
import {connect} from "react-redux";
import {setMoviesTextFilter} from "../actions/filters";

class MoviesListFilter extends React.Component{
    render() {
        return (
            <form className="mb-4">
                <fieldset className="form-group">
                    <label htmlFor="moviesListFilter" className="bmd-label-floating">
                        Filter by movie's title
                    </label>

                    <input
                        type="text"
                        id="moviesListFilter"
                        className="form-control"
                        value={this.props.filters.movies_text}
                        onChange={(event) => {
                            this.props.dispatch(setMoviesTextFilter(event.target.value));
                        }}
                    />
                </fieldset>
            </form>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
};

export default connect(mapStateToProps)(MoviesListFilter);