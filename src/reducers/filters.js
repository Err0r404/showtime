const cinemaFiltersReducerDefaultState = {
    cinemas_text: '',
    movies_text: '',
};

const filtersReducer = (state = cinemaFiltersReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_CINEMAS_TEXT_FILTER':
            console.log("REDUCER TRIGGERED");
            console.log({
                ...state,
                cinemas_text: action.text
            });

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