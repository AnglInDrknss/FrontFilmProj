type Movie = {
    id: string;
    originalTitle: string;
    primaryImage?: {
        url: string;
    }
};

export const addToFavorites = (movie: Movie) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.some((m: Movie) => m.id === movie.id)) {
        favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
};

export const removeFromFavorites = (movieId: string) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = favorites.filter((m: Movie) => m.id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

export const getFavorites = (): Movie[] => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
};
