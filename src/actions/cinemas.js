export const addCinema = ({code, name, address, city, geoloc, screenCount, hasPRMAccess}) => {
    return {
        type: 'ADD_CINEMA',
        cinema : {
            code,
            name,
            address,
            city,
            geoloc,
            screenCount,
            hasPRMAccess
        }
    }
};

export const addCinemas = (cinemas) => {
    return {
        type: 'ADD_CINEMAS',
        cinemas
    }
};
