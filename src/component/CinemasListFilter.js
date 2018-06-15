import React from 'react';
import {connect} from "react-redux";
import {setCinemasTextFilter} from "../actions/filters";

class CinemasListFilter extends React.Component{
    render() {
        return (
            <form className="mb-0">
                <fieldset className="form-group mb-0">
                    <label htmlFor="cinemaListFilter" className="bmd-label-floating">
                        Filter by cinema's name
                    </label>

                    <input
                        type="text"
                        id="cinemaListFilter"
                        className="form-control"
                        value={this.props.filters.cinemas_text}
                        onChange={(event) => {
                            this.props.dispatch(setCinemasTextFilter(event.target.value));
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

export default connect(mapStateToProps)(CinemasListFilter);