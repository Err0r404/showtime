import React from 'react';
import {connect} from 'react-redux'

import CinemasListItem from './CinemasListItem'
import CinemaListFilter from "./CinemasListFilter";
import getVisibleCinemas from "../selectors/cinemas";

const CinemasList = (props) => {
    return (
        <div className="row">
            <div className="col">
                <CinemaListFilter/>

                <ul className="list-group">
                    {props.cinemas.map((cinema) => {
                        return <CinemasListItem key={cinema.code} {...cinema}/>
                    })}
                </ul>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        cinemas: getVisibleCinemas(state.cinemas, state.filters)
    }
};

export default connect(mapStateToProps)(CinemasList);