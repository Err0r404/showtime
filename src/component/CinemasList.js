import React from 'react';
import {connect} from 'react-redux'
import axios from 'axios';

import CinemasListItem from './CinemasListItem'
import CinemaListFilter from "./CinemasListFilter";
import getVisibleCinemas from "../selectors/cinemas";
import AlloCine from "../api/allocine";
import {addCinemas} from "../actions/cinemas";

class CinemasList extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;

        this.state = {
            error: false,
            pending: true
        };
    }

    componentDidMount() {
        if (this.props.cinemas.length === 0) {
            let alloCine = new AlloCine();
            let queryUrl = alloCine.theaterList('34000');

            // Actually do the request
            axios.get(queryUrl, {
                "user-agent": alloCine.userAgent,
                "timeout": 10000 // 10 seconds
            })
                .then(response => {
                    console.log(response.data.feed.theater);

                    this.setState({pending: false});

                    let cinemas = [];
                    for (let cinema of response.data.feed.theater) {
                        cinemas.push(cinema);
                    }
                    this.props.dispatch(addCinemas(cinemas));
                })
                .catch(function (error) {
                    console.error(error);
                    this.setState({error: true});
                })
            ;
        }
        else{
            this.setState({pending: false});
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <CinemaListFilter/>

                    {this.state.error && <div className="alert alert-danger mt-4" role="alert">
                        Hum... That's embarrassing but an error occurred... <br/>
                        Please try again in a few minutes
                    </div>}

                    {this.state.pending && <p className="text-center mt-4">
                        <i className="fa fa-circle-o-notch fa-spin fa-4x fa-fw" aria-hidden="true"></i>
                    </p>}

                    <ul className="list-group">
                        {this.props.cinemas.map((cinema) => {
                            return <CinemasListItem key={cinema.code} {...cinema}/>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cinemas: getVisibleCinemas(state.cinemas, state.filters)
    }
};

export default connect(mapStateToProps)(CinemasList);