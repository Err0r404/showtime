const getVisibleMovies = (movies, {movies_text}) => {
    return movies.filter((movie) => {
        const textMatch = movie.title.toLowerCase().includes(movies_text.toLowerCase());

        return textMatch;
    });
};

export default getVisibleMovies;