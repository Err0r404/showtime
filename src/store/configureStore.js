import {combineReducers, createStore} from 'redux';

import filtersReducer from '../reducers/filters'
import cinemasReducer from "../reducers/cinemas";
import moviesReducer from "../reducers/movies";

export default () => {
    const store = createStore(
        combineReducers({
            cinemas: cinemasReducer,
            movies: moviesReducer,
            filters: filtersReducer
        })
    );

    return store;
};