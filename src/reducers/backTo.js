const backToReducerDefaultState = {
    url: ''
};

const backToReducer = (state = backToReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_BACK_TO':
            return {
                ...state,
                url: action.url
            };
        default:
            return state;
    }
};

export default backToReducer;