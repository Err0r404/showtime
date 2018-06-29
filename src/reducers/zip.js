const zipReducerDefaultState = {
    value: ''
};

const zipReducer = (state = zipReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_ZIP':
            return {
                ...state,
                value: action.zip
            };
        default:
            return state;
    }
};

export default zipReducer;