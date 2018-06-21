import React from 'react';
import {connect} from 'react-redux';
import axios from "axios/index";

import MovieListItem from "./MovieListItem";
import MoviesListFilter from "./MoviesListFilter";
import getVisibleMovies from "../selectors/movies";
import AlloCine from "../api/allocine";
import {addMovies, clearMovies} from "../actions/movies";

class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            error: false,
            pending: true,
            cinema: {
                code: "",
                name: "",
                address: "",
            }
        };
    }

    componentDidMount() {
        if (this.props.movies.length > 0) {
            this.props.dispatch(clearMovies());
        }

        this.setState({pending: true});

        let alloCine = new AlloCine();
        let queryUrl = alloCine.showtimeList(this.props.match.params.code);

        // Actually do the request
        axios.get(queryUrl, {"user-agent": alloCine.userAgent, "timeout": 10000})
            .then(response => {
                this.setState({pending: false});

                if(response.data.feed.totalResults > 0){
                    console.log(response.data.feed.theaterShowtimes[0].place);

                    this.setState({
                        cinema: {
                            code: response.data.feed.theaterShowtimes[0].place.theater.code,
                            name: response.data.feed.theaterShowtimes[0].place.theater.name,
                            address: response.data.feed.theaterShowtimes[0].place.theater.address,
                        }
                    });


                    let movies = [];
                    for (let movieShowtimes of response.data.feed.theaterShowtimes[0].movieShowtimes) {
                        let found = false;
                        for (let index in movies) {
                            if (movies[index].code !== undefined && movies[index].code === movieShowtimes.onShow.movie.code) {
                                found = index;
                                break;
                            }
                        }

                        if (found === false) {
                            let genres = [];
                            for (let genre of movieShowtimes.onShow.movie.genre) {
                                genres.push(genre.$);
                            }

                            let schedules = [];
                            for (let schedule of movieShowtimes.scr[0].t) {
                                schedules.push(schedule.$)
                            }

                            let showtime = {
                                type: movieShowtimes.version.$ + ', ' + movieShowtimes.screenFormat.$,
                                schedules
                            };

                            movies.push({
                                code: movieShowtimes.onShow.movie.code,
                                title: movieShowtimes.onShow.movie.title,
                                runtime: movieShowtimes.onShow.movie.runtime,
                                genres,
                                directors: movieShowtimes.onShow.movie.castingShort.directors,
                                actors: movieShowtimes.onShow.movie.castingShort.actors,
                                pressRating: movieShowtimes.onShow.movie.statistics.pressRating,
                                userRating: movieShowtimes.onShow.movie.statistics.userRating,
                                poster: movieShowtimes.onShow.movie.poster.href,
                                showtimes: [showtime]
                            });
                        }
                        else {
                            let schedules = [];
                            for (let schedule of movieShowtimes.scr[0].t) {
                                schedules.push(schedule.$)
                            }

                            let showtime = {
                                type: movieShowtimes.version.$ + ', ' + movieShowtimes.screenFormat.$,
                                schedules
                            };

                            movies[found].showtimes.push(showtime);
                        }
                    }
                    this.props.dispatch(addMovies(movies));

                }
            })
            .catch(function (error) {
                console.error(error);
                this.setState({error: true});
            })
        ;
    }

    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid mb-0 pt-3 pb-3" style={{backgroundImage: "url('/jumbotron-cinema.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                    <div className="container">
                        <h1 className="display-4 font-weight-bold text-light">{this.state.cinema.name}</h1>
                        <p className="lead text-light">{this.state.cinema.address}</p>
                    </div>
                </div>

                <div className="container pt-3">
                    <div className="row">
                        <div className="col">
                            {!this.state.pending && <MoviesListFilter/>}

                            {this.state.error && <div className="alert alert-danger mt-4" role="alert">
                                Hum... That's embarrassing but an error occurred... <br/>
                                Please try again in a few minutes
                            </div>}

                            {this.state.pending && <p className="text-center mt-4">
                                <i className="fa fa-circle-o-notch fa-spin fa-4x fa-fw" aria-hidden="true"></i>
                            </p>}

                            {!this.state.pending && this.props.movies.length === 0 &&
                            <div className="alert alert-info mt-4" role="alert">
                                Hum... That's strange but we didn't found any movie... <br/>
                                Please try again in a few minutes
                            </div>}

                            {
                                this.props.movies.map((movie) => {
                                    return <MovieListItem key={movie.code} cinema={this.state.cinema.code} {...movie}/>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>);
    }
};

const mapStateToProps = (state) => {
    return {
        movies: getVisibleMovies(state.movies, state.filters)
    }
};

export default connect(mapStateToProps)(MovieList);