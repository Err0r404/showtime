const getVisibleCinemas = (cinemas, {cinemas_text}) => {
    return cinemas.filter((cinema) => {
        const textMatch = cinema.name.toLowerCase().includes(cinemas_text.toLowerCase());

        return textMatch;
    });
};

export default getVisibleCinemas;