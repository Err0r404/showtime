export const addMovie = ({code, title, runtime, genres, directors, actors, pressRating, userRating, poster, showtimes}) => {
    return {
        type: 'ADD_MOVIE',
        movie : {
            code,
            title,
            runtime,
            genres,
            directors,
            actors,
            pressRating,
            userRating,
            poster,
            showtimes
        }
    }
};

export const editMovie = (code, updates) => {
    return {
        type: 'EDIT_MOVIE',
        code,
        updates
    }
};

export const addMovies = (movies) => {
    return {
        type: 'ADD_MOVIES',
        movies
    }
};

export const clearMovies = () => {
    return {
        type: 'CLEAR_MOVIES'
    }
};