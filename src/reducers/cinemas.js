const cinemasReducerDefaultState = [];

const cinemasReducer = (state = cinemasReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_CINEMA':
            return [
                ...state,
                action.cinema
            ];
        default:
            return state;
    }
};

export default cinemasReducer;