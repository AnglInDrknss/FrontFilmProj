const API = 'https://api.imdbapi.dev'

export const boardMovies = async () => {
    const response = await fetch(`${API}/titles`)
    return response.json()
}


export const searchMovies = async (query: string, limit = 50) => {
    const response = await fetch(`${API}/search/titles?query=${query}&limit=${limit}`)
    return response.json()
}

export const getMovieById = async (id: string) => {
    const response = await fetch(`${API}/titles/${id}`)
    return response.json()
}