import React from 'react';
import moment from 'moment/moment';
import momentDurationFormat from 'moment-duration-format';
import {Link} from "react-router-dom";

import StarRating from "./StarRating";

moment.locale('fr');
momentDurationFormat(moment);

const MovieListItem = ({code, title, runtime, genres, directors, actors, pressRating, userRating, poster, showtimes}) => {

    return (
        <div className="row mb-5">
            <a href={"/movies/" + code} className="text-dark">
                <div className="col">
                    <div className="row">
                        {/* Poster */}
                        <div className="col-4">
                            <img src={poster} className="img-fluid" alt={`Poster of ${title}`}/>
                        </div>

                        {/* Tile & description */}
                        <div className="col-8">
                            <p className="h4 mb-0">{title}</p>

                            <small className="d-block">
                                {moment.duration(runtime, 'seconds').format('hh[h] mm[m]')}
                                <span className="ml-1 mr-1">–</span>
                                {genres.map((genre, index) => {
                                    return index === 0 ? genre : ' / ' + genre;
                                })}
                            </small>

                            <small className="d-block">
                                <span className="text-muted">Avec : </span>
                                {actors}
                            </small>
                        </div>
                    </div>
                </div>
            </a>

            {/* Scores */}
            <div className="col-12 mt-3 mb-3">
                <div className="row">
                    <div className="col text-center">
                        <p className="mb-0">
                            {/* Rounded to 1 decimal */}
                            <b>Presse : </b>{Math.round(pressRating * 10) / 10}
                        </p>

                        <StarRating code={code} rating={pressRating} max={5}/>
                    </div>

                    <div className="col text-center">
                        <p className="mb-0">
                            {/* Rounded to 1 decimal */}
                            <b>Public : </b>{Math.round(userRating * 10) / 10}
                        </p>

                        <StarRating code={code} rating={userRating} max={5}/>
                    </div>
                </div>
            </div>

            {/* Schedules */}
            <div className="col">
                {showtimes.map((showtime) => {
                    return (
                        <div key={code + "_" + showtime.type}>
                            <p className="mb-0 font-weight-bold">{showtime.type}</p>
                            <ul className="list-inline mb-1">
                                {showtime.schedules.map((schedule) => {
                                    return (<li key={code + "_" + schedule} className="list-inline-item h4">
                                        <span className="badge badge-primary">{schedule}</span>
                                    </li>)
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default MovieListItem;