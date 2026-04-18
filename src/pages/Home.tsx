import { useEffect, useState } from 'react';
import { boardMovies, searchMovies } from '../services/api';
import { Link } from 'react-router-dom';
import { addToFavorites, getFavorites, removeFromFavorites } from '../services/favorites';

type Movie = {
    id: string;
    originalTitle: string;
    primaryImage?: {
        url: string;
    }
}

export default function Home() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [favorites, setFavorites] = useState(getFavorites());

    useEffect(() => {
        boardMovies().then((data) => {
            setMovies(data.titles);
        });
    }, []);

    const handleSearch = async () => {
        searchMovies(query).then((data) => {
            setMovies(data.titles);
        });
    };

    const handleFavorites = (movieId: string) => {
        if (getFavorites().includes(movieId)) {
            removeFromFavorites(movieId);
            setFavorites(getFavorites());
        } else {
            addToFavorites(movieId);
            setFavorites(getFavorites());
        }
    };

    return (
        <div>
            <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)} 
            />
            <button onClick={handleSearch}>Search</button>
            <div className="grid grid-cols-4 gap-2">
                {movies.map((movie) => (
                    <div className="p-2" key={movie.id}>
                        <img src={movie?.primaryImage?.url} alt={movie.originalTitle} />
                        <Link to={`/movie/${movie.id}`}>
                            <h3>{movie.originalTitle}</h3>
                        </Link>
                        {getFavorites().includes(movie.id) ? (
                            <button onClick={() => handleFavorites(movie.id)} className='p-3 bg-gray-500'>Remove from Favorites</button>
                        ) : (
                            <button onClick={() => handleFavorites(movie.id)} className='p-3 bg-red-500'>Add to Favorites</button>
                        )}
                    </div>
                ))}
            </div>
        </div>

    );
}