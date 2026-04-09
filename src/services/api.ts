const API = 'https://api.imdbapi.dev'

export const searchMovies = async (query: string, limit = 50) => {
    const response = await fetch(`${API}/search/titles?query=${query}&limit=${limit}`)
    return response.json()
}

export const getMovieById = async (id: string) => {
    const response = await fetch(`${API}/title/${id}`)
    return response.json()
}