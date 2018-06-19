const moviesReducerDefaultState = [];

const moviesReducer = (state = moviesReducerDefaultState, action) => {
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
        case 'CLEAR_MOVIES':
            return [];
        default:
            return state;
    }
};

export default moviesReducer;