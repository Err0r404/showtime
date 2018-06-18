import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import 'bootstrap-material-design/dist/css/bootstrap-material-design.css';

import theaterlist from './data/theaterlist';
import showtimelist from './data/showtimelist';

import AlloCine from './api/allocine';

import App from './App';
import configureStore from './store/configureStore';
import {addCinemas} from "./actions/cinemas";
import {addMovies} from "./actions/movies";

import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

// Parse theaterlist API results
let cinemas = [];
for(let cinema of theaterlist.feed.theater){
    cinemas.push(cinema);
    // store.dispatch(addCinema({...cinema}));
}
// store.dispatch(addCinemas(cinemas));

// Parse showtimelist API results
let movies = [];
for(let movieShowtimes of showtimelist.feed.theaterShowtimes[0].movieShowtimes){
    let found = false;
    for(let index in movies){
        if(movies[index].code !== undefined && movies[index].code === movieShowtimes.onShow.movie.code){
            found = index;
            break;
        }
    }

    if(found === false){
        let genres = [];
        for(let genre of movieShowtimes.onShow.movie.genre){
            genres.push(genre.$);
        }

        let schedules = [];
        for(let schedule of movieShowtimes.scr[0].t){
            schedules.push(schedule.$)
        }

        let showtime = {
            type: movieShowtimes.version.$+', '+movieShowtimes.screenFormat.$,
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
    else{
        let schedules = [];
        for(let schedule of movieShowtimes.scr[0].t){
            schedules.push(schedule.$)
        }

        let showtime = {
            type: movieShowtimes.version.$+', '+movieShowtimes.screenFormat.$,
            schedules
        };

        movies[found].showtimes.push(showtime);
    }
}
store.dispatch(addMovies(movies));

console.log(store.getState());

const jsx = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
