const cinemasReducerDefaultState = [];

const cinemasReducer = (state = cinemasReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_CINEMA':
            return [
                ...state,
                action.cinema
            ];
        case 'ADD_CINEMAS':
            return [
                ...state,
                ...action.cinemas
            ];
        default:
            return state;
    }
};

export default cinemasReducer;