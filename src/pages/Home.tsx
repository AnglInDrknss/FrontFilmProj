import { use, useEffect, useState } from 'react';
import { boardMovies, searchMovies } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { addToFavorites, getFavorites, removeFromFavorites } from '../services/favorites';

type Movie = {
    id: string;
    originalTitle: string;
    primaryImage?: {
        url: string;
    }
}


export default function Home() {
    const navigate = useNavigate();
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

    const handleFavorites = (movie: Movie) => {
        if (getFavorites().some(m => m.id === movie.id)) {
            removeFromFavorites(movie.id);
            setFavorites(getFavorites());
        } else {
            addToFavorites(movie);
            setFavorites(getFavorites());
        }
    };

    return (
        <div>
            <div className='flex justify-start gap-4 mb-4 pt-4 px-4'>
                <input 
                    className='border p-2 rounded-md'
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} 
                />
                <button className='p-2 bg-blue-500 text-white rounded-md' onClick={handleSearch}>Search</button>
                <button className='p-2 bg-gray-500 text-white rounded-md' onClick={() => navigate('/history')}>history</button>
                <button className='p-2 bg-black text-white rounded-md' onClick={() => navigate('/favorites')}>favorites</button>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <div className="p-2" key={movie.id}>
                        <img src={movie?.primaryImage?.url} alt={movie.originalTitle} />
                        <Link to={`/movie/${movie.id}`} onClick={() => {
                            const history = JSON.parse(localStorage.getItem("movieHistory") || "[]");
                            const exists = history.some((m: Movie) => m.id === movie.id);
                            if (!exists) {
                                history.push(movie);
                                localStorage.setItem("movieHistory", JSON.stringify(history));
                            }
                        }}>
                            <h3>{movie.originalTitle}</h3>
                        </Link>
                        {getFavorites().some(m => m.id === movie.id) ? (
                            <button onClick={() => handleFavorites(movie)} className='p-3 bg-gray-500'>Remove from Favorites</button>
                        ) : (
                            <button onClick={() => handleFavorites(movie)} className='p-3 bg-red-500'>Add to Favorites</button>
                        )}
                    </div>
                ))}
            </div>
        </div>

    );
}