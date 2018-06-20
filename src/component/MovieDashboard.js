import React from 'react';
import axios from "axios/index";
import moment from "moment/moment";
import 'moment/locale/fr'

import AlloCine from "../api/allocine";
import StarRating from "./StarRating";

class MovieDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            error: false,
            pending: true,
            movie: {
                code: '',
                title: '',
                synopsis: '',
                runtime: '',
                genres: [],
                directors: '',
                actors: '',
                pressRating: '',
                pressReviewCount: '',
                userRating: '',
                userReviewCount: '',
                poster: '',
                showtimes: [],
            }
        };
    }

    componentDidMount() {
        let alloCine = new AlloCine();
        let queryUrl = alloCine.showtimeList(this.props.match.params.cinemaCode, this.props.match.params.movieCode, '');

        // Actually do the request
        axios.get(queryUrl, {"user-agent": alloCine.userAgent, "timeout": 10000})
            .then(response => {
                console.log(response.data.feed.theaterShowtimes[0]);
                this.setState({pending: false});

                if (response.data.feed.theaterShowtimes[0].movieShowtimes === undefined){
                    this.setState({error: true});
                    console.log("No movieShowtimes");
                    return;
                }

                let movie;
                for (let movieShowtimes of response.data.feed.theaterShowtimes[0].movieShowtimes) {
                    if (!movie) {
                        let genres = [];
                        for (let genre of movieShowtimes.onShow.movie.genre) {
                            genres.push(genre.$);
                        }

                        let schedules = [];
                        for (let schedule of movieShowtimes.scr) {
                            let seances = [];
                            for (let seance of schedule.t) {
                                seances.push(seance.$);
                            }

                            schedules.push({
                                date: schedule.d,
                                seances
                            })
                        }

                        let showtime = {
                            type: movieShowtimes.version.$ + ', ' + movieShowtimes.screenFormat.$,
                            schedules
                        };

                        movie = {
                            code: movieShowtimes.onShow.movie.code,
                            title: movieShowtimes.onShow.movie.title,
                            runtime: movieShowtimes.onShow.movie.runtime,
                            genres,
                            directors: movieShowtimes.onShow.movie.castingShort.directors,
                            actors: movieShowtimes.onShow.movie.castingShort.actors,
                            pressRating: movieShowtimes.onShow.movie.statistics.pressRating,
                            pressReviewCount: movieShowtimes.onShow.movie.statistics.pressReviewCount,
                            userRating: movieShowtimes.onShow.movie.statistics.userRating,
                            userReviewCount: movieShowtimes.onShow.movie.statistics.userReviewCount,
                            poster: movieShowtimes.onShow.movie.poster.href,
                            showtimes: [showtime]
                        };
                    }
                    else {
                        let schedules = [];
                        for (let schedule of movieShowtimes.scr) {
                            let seances = [];
                            for (let seance of schedule.t) {
                                seances.push(seance.$);
                            }

                            schedules.push({
                                date: schedule.d,
                                seances
                            })
                        }
                        // console.log(schedules);

                        let showtime = {
                            type: movieShowtimes.version.$ + ', ' + movieShowtimes.screenFormat.$,
                            schedules
                        };

                        movie.showtimes.push(showtime);
                    }
                }
                this.setState({movie: movie});

                // Get additional data about movie
                this.getAdditionalData(movie);

            })
            .catch(function (error) {
                console.error(error);

                this.setState({error: true});
            });
    }

    getAdditionalData(movie) {
        let alloCine = new AlloCine();
        let queryUrl = alloCine.movie(this.props.match.params.movieCode);

        // Actually do the request
        axios.get(queryUrl, {"user-agent": alloCine.userAgent, "timeout": 10000})
            .then(response => {
                // console.log(response);
                movie.synopsis = response.data.movie.synopsis;
                this.setState({movie: movie});
            })
            .catch(function (error) {
                console.error(error);
                this.setState({error: true});
            });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col">
                        {this.state.error && <div className="alert alert-danger mt-4" role="alert">
                            Hum... That's embarrassing but an error occurred... <br/>
                            Please try again in a few minutes
                        </div>}

                        {this.state.pending && <p className="text-center mt-4">
                            <i className="fa fa-circle-o-notch fa-spin fa-4x fa-fw" aria-hidden="true"/>
                        </p>}
                    </div>
                </div>

                {/* Poster */}
                <div className="row mb-2">
                    <div className="col" style={{position: "relative", overflow: "hidden"}}>
                        <img src={this.state.movie.poster} className="blur blur-left" alt=""/>
                        <img src={this.state.movie.poster} className="blur blur-right" alt=""/>
                        <img src={this.state.movie.poster} className="img-fluid mx-auto d-block" alt=""
                             style={{maxHeight: "250px", position: "relative"}}/>
                    </div>
                </div>

                {/* Title + time + genres */}
                <div className="row">
                    <div className="col text-center">
                        <p className="lead font-weight-bold mb-1 text-uppercase">{this.state.movie.title}</p>

                        <p className="text-muted mb-0">
                            {this.state.movie.genres.map((genre, index) => {
                                return index === 0 ? genre : ', ' + genre;
                            })}
                        </p>

                        <p className="text-muted">
                            {moment.duration(this.state.movie.runtime, 'seconds').format('hh[h] mm[m]')}
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        {/* Tabs */}
                        <ul className="nav nav-tabs bg-dark mb-4" role="tablist">
                            <li className="nav-item">
                                <a href="#movie" className="nav-link" data-toggle="tab" role="tab" aria-controls="movie"
                                   aria-selected="true">
                                    Movie
                                </a>
                            </li>

                            <li className="nav-item">
                                <a href="#seances" className="nav-link active" data-toggle="tab" role="tab"
                                   aria-controls="seances" aria-selected="false">
                                    Seances
                                </a>
                            </li>
                        </ul>

                        {/* Tabs content */}
                        <div className="tab-content">
                            {/* Scores + Movie's info */}
                            <div id="movie" className="tab-pane fade" role="tabpanel" aria-labelledby="movie-tab">
                                <div className="row mb-4">
                                    <div className="col">
                                        {/* Press rating */}
                                        <div className="row">
                                            <div className="col">
                                                <p className="mb-0">
                                                    {/* Rounded to 1 decimal */}
                                                    Presse : <b>{Math.round(this.state.movie.pressRating * 10) / 10}</b>
                                                </p>
                                            </div>

                                            <div className="col text-center">
                                                <StarRating code={this.state.movie.code} rating={this.state.movie.pressRating}
                                                            max={5}/>
                                            </div>

                                            <div className="col text-right">
                                                <p className="text-muted mb-0">
                                                    {this.state.movie.pressReviewCount} avis
                                                </p>
                                            </div>
                                        </div>

                                        {/* Users rating */}
                                        <div className="row">
                                            <div className="col">
                                                <p className="mb-0">
                                                    {/* Rounded to 1 decimal */}
                                                    Public : <b>{Math.round(this.state.movie.userRating * 10) / 10}</b>
                                                </p>
                                            </div>

                                            <div className="col text-center">
                                                <StarRating code={this.state.movie.code} rating={this.state.movie.userRating}
                                                            max={5}/>
                                            </div>

                                            <div className="col text-right">
                                                <p className="text-muted mb-0">
                                                    {this.state.movie.userReviewCount} avis
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Directors */}
                                <p>
                                    <span className="text-uppercase text-muted">De : </span>
                                    {this.state.movie.directors}
                                </p>

                                {/* Actors */}
                                <p>
                                    <span className="text-uppercase text-muted">Avec : </span>
                                    {this.state.movie.actors}
                                </p>

                                {/* Synopsis */}
                                <p className="text-uppercase text-muted mb-1">Synopsis</p>
                                <p>{this.state.movie.synopsis}</p>
                            </div>

                            {/* Schedules */}
                            <div id="seances" className="tab-pane fade show active" role="tabpanel" aria-labelledby="seances-tab">
                                {this.state.movie.showtimes.map((showtime) => {
                                    return (
                                        <div key={showtime.type}>
                                            <p className="mb-0 font-weight-bold lead">{showtime.type}</p>

                                            <div className="col">
                                                <div className="row">
                                                    {/* Carousel's prev */}
                                                    <div className="col-1 my-auto p-0 text-left">
                                                        <a className="text-dark" href={"#"+showtime.type} role="button" data-slide="prev">
                                                            <ion-icon name="arrow-back"/>
                                                            <span className="sr-only">Previous</span>
                                                        </a>
                                                    </div>

                                                    {/* Carousel's content */}
                                                    <div className="col-10">
                                                        <div className="carousel slide" data-ride="carousel"
                                                             data-interval="false" id={showtime.type}>
                                                            <div className="carousel-inner">
                                                                {showtime.schedules.map((schedule, index) => {
                                                                    let activeClass = index === 0 ? "active" : "";

                                                                    return (
                                                                        <div key={showtime.type + "_" + schedule.date} className={"carousel-item " + activeClass}>
                                                                            <span className="text-uppercase text-muted">{moment(schedule.date, 'YYYY-MM-DD').format('ddd DD MMM')}</span>

                                                                            <ul className="list-inline mb-1">
                                                                                {schedule.seances.map((seance) => {
                                                                                    return (
                                                                                        <li key={schedule.date + "_" + seance} className="list-inline-item h5">
                                                                                            <span className="badge badge-primary">{seance}</span>
                                                                                        </li>
                                                                                    )
                                                                                })}
                                                                            </ul>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Carousel's next */}
                                                    <div className="col-1 my-auto p-0 text-right">
                                                        <a className="text-dark" href={"#"+showtime.type} role="button" data-slide="next">
                                                            <ion-icon name="arrow-forward"/>
                                                            <span className="sr-only">Next</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieDashboard;