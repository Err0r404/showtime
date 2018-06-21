const filtersReducerDefaultState = {
    cinemas_text: '',
    movies_text: '',
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_CINEMAS_TEXT_FILTER':
            return {
                ...state,
                cinemas_text: action.text
            };
        case 'SET_MOVIES_TEXT_FILTER':
            return {
                ...state,
                movies_text: action.text
            };
        default:
            return state;
    }
};

export default filtersReducer;