export const setCinemasTextFilter = (text = '') => {
    return {
        type: 'SET_CINEMAS_TEXT_FILTER',
        text: text
    }
};

export const setMoviesTextFilter = (text = '') => {
    return {
        type: 'SET_MOVIES_TEXT_FILTER',
        text: text
    }
};