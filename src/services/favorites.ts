export const addToFavorites = (movieId: string) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(movieId)) {
        favorites.push(movieId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
};

export const removeFromFavorites = (movieId: string) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = favorites.filter((id: string) => id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

export const getFavorites = (): string[] => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
};
