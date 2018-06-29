const radiusReducerDefaultState = {
    value: 10
};

const radiusReducer = (state = radiusReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_RADIUS':
            return {
                ...state,
                value: action.radius
            };
        default:
            return state;
    }
};

export default radiusReducer;