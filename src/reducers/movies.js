const cinemasReducerDefaultState = [];

const cinemasReducer = (state = cinemasReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_MOVIE':
            return [
                ...state,
                action.movie
            ];
        case 'EDIT_MOVIE':
            return [
                ...state,
                action.movie
            ];
        case 'ADD_MOVIES':
            return [
                ...state,
                ...action.movies
            ];
            // return action.movies;
        default:
            return state;
    }
};

export default cinemasReducer;