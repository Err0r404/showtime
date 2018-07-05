import React from 'react';
import {connect} from 'react-redux'
import axios from 'axios';

import store from '../store/configureStore';

import CinemasListItem from './CinemasListItem'
import CinemaListFilter from "./CinemasListFilter";
import getVisibleCinemas from "../selectors/cinemas";
import AlloCine from "../api/allocine";
import {addCinemas, clearCinemas} from "../actions/cinemas";
import {setBackTo} from "../actions/backTo";

class CinemasList extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;

        this.state = {
            apiError: false,
            apiPending: true,
            position: {
                lat: '',
                long: ''
            },
            zip: '',
            geoError: false
        };
    }

    getData(){
        // console.log("getData", this.state.position, this.state.zip);
        // console.log("getData");

        this.setState({apiPending: true});
        this.props.dispatch(clearCinemas());

        let alloCine = new AlloCine(store());

        let queryUrl;
        if (this.props.zip.value !== ""){
            // console.log(this.state.zip);
            queryUrl = alloCine.theaterListByZip(this.props.zip.value);
        }
        else {
            // console.log(this.state.position.lat, this.state.position.long);
            queryUrl = alloCine.theaterListByCoord(this.state.position.lat, this.state.position.long);
        }

        // Actually do the request
        axios.get(queryUrl, {"user-agent": AlloCine.userAgent, "timeout": 10000})
            .then(response => {
                // console.log(response.data);
                this.setState({apiPending: false});

                if(response.data.feed.totalResults && response.data.feed.totalResults > 0){
                    let cinemas = [];
                    for (let cinema of response.data.feed.theater) {
                        cinemas.push(cinema);
                    }
                    this.props.dispatch(addCinemas(cinemas));
                }
            })
            .catch(function (error) {
                console.error(error);
                this.setState({apiError: true});
            })
        ;
    }

    componentDidMount() {
        this.props.dispatch(setBackTo(""));

        this.setState({apiPending: true});

        if(navigator.geolocation){
            this._geoSuccessCallback = (position) => {
                // console.log('lat: ',position.coords.latitude);
                // console.log('long: ',position.coords.longitude);

                this.setState({
                    position: {
                        lat: position.coords.latitude,
                        long: position.coords.longitude
                    }
                });
                this.getData();
            };

            this._geoErrorCallback = (error) => {
                this.setState({apiPending: false});

                switch (error.code) {
                    case error.TIMEOUT:
                        console.log("Browser geolocation error !\nTimeout.");
                        this.setState({geoError: "Timeout on browser geolocation"});
                        break;
                    case error.PERMISSION_DENIED:
                        console.log("Only secure origins are allowed\nPermission denied");
                        this.setState({geoError: "Geolocation permission denied"});
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.log("Browser geolocation error !\nPosition unavailable.");
                        this.setState({geoError: "Position unavailable"});
                        break;
                    default:
                        console.log(error.code);
                        break;
                }
            };

            navigator.geolocation.getCurrentPosition(this._geoSuccessCallback, this._geoErrorCallback, {maximumAge: 900000});
        }
        else {
            console.log("Geolocation is not supported for this Browser/OS.");
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.zip.value !== this.props.zip.value && this.props.zip.value.length === 5) {
            this.getData();
        }
    }

    render() {
        // console.log(this.props.zip);
        // this.getData();

        return (
            <div className="container pt-3">
                <div className="row">
                    <div className="col">
                        {(!this.state.apiError && !this.state.geoError && !this.state.apiPending && this.props.cinemas.length > 0) && <CinemaListFilter/>}

                        {this.state.apiError && <div className="alert alert-danger mt-4" role="alert">
                            Hum... That's embarrassing but an error occurred... <br/>
                            Please try again in a few minutes
                        </div>}

                        {this.state.geoError && <div className="alert alert-danger mt-4" role="alert">
                            Hum... That's embarrassing but an error occurred... <br/>
                            <b>{this.state.geoError}</b>
                        </div>}

                        {this.state.apiPending && <p className="text-center mt-4">
                            <i className="fa fa-circle-o-notch fa-spin fa-4x fa-fw" aria-hidden="true"></i>
                        </p>}

                        {!this.state.apiPending && this.props.cinemas.length === 0 && <div className="alert alert-info mt-4" role="alert">
                            Hum... That's embarrassing but we didn't found any cinemas around you...
                        </div>}

                        <ul className="list-group">
                            {this.props.cinemas.map((cinema) => {
                                return <CinemasListItem key={cinema.code} {...cinema}/>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cinemas: getVisibleCinemas(state.cinemas, state.filters),
        zip: state.zip
    }
};

export default connect(mapStateToProps)(CinemasList);