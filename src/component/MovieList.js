import React from 'react';
import {connect} from 'react-redux';

import MovieListItem from "./MovieListItem";
import MoviesListFilter from "./MoviesListFilter";
import getVisibleMovies from "../selectors/movies";

const MovieList = (props) => {
    return (
        <div className="row">
            <div className="col">
                <MoviesListFilter/>

                {
                    props.movies.map((movie) => {
                        return <MovieListItem key={movie.code} {...movie}/>
                    })
                }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        movies: getVisibleMovies(state.movies, state.filters)
    }
};

export default connect(mapStateToProps)(MovieList);