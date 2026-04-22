import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type Movie = {
    id: string;
    originalTitle: string;
    primaryImage?: {
        url: string;
    }
};

export default function History() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem("movieHistory") || "[]");
        setMovies(history);
    }, []);

    return (
        <div>
            <div className='mb-4'>
                <button 
                    className='p-2 bg-blue-500 text-white rounded-md' 
                    onClick={() => navigate('/')}
                >
                    Back to Home
                </button>
            </div>
            <h1 className='text-2xl font-bold mb-4'>History</h1>
            {movies.length === 0 ? (
                <p>No movies viewed yet</p>
            ) : (
                <div className="grid grid-cols-4 gap-4">
                    {movies.map((movie) => (
                        <div className="p-2" key={movie.id}>
                            <img src={movie?.primaryImage?.url} alt={movie.originalTitle} />
                            <Link to={`/movie/${movie.id}`}>
                                <h3>{movie.originalTitle}</h3>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}