import { useParams } from "react-router-dom"
import { getMovieById } from "../services/api";
import { useEffect, useState } from "react";

type Movie = {
    id: string;
    originalTitle: string;
    releaseDate?: string;
    plot?: string;
    primaryImage?: {
        url: string;
    }
    runtimeSeconds?: number;
    rating?: {
        aggregateRating?: number;
    };
}

export default function MovieDetails() {
    const {id} = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        getMovieById(id!).then((data) => {
            setMovie(data);
        });
    }, [id]);

    const handleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (isFavorite) {
            const updatedFavorites = favorites.filter((m: Movie) => m.id !== id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } else {
            favorites.push(movie);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="p-4">
            <button 
                className='p-2 bg-blue-500 text-white rounded-md mb-4' 
                onClick={() => window.history.back()}
            >
                Back to Home
            </button>
            
            <div className="flex gap-8">
                <div className="flex-shrink-0">
                    <img 
                        className='w-64 h-auto rounded-lg shadow-lg' 
                        src={movie?.primaryImage?.url} 
                        alt={movie?.originalTitle} 
                    />
                    <button
                        onClick={handleFavorite}
                        className={`w-64 mt-4 p-3 rounded-md text-white font-bold ${
                            isFavorite ? 'bg-gray-500' : 'bg-red-500'
                        }`}
                    >
                        {isFavorite ? '★ Remove from Favorites' : '☆ Add to Favorites'}
                    </button>
                </div>

                <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-4">{movie?.originalTitle}</h1>
                    
                    <div className="space-y-3 mb-6">
                        {movie?.startYear && (
                            <div>
                                <span className="font-semibold">Release Date:</span>
                                <p>{movie.startYear}</p>
                            </div>
                        )}
                        
                        {movie?.runtimeSeconds && (
                            <div>
                                <span className="font-semibold">Duration:</span>
                                <p>{Math.floor(movie.runtimeSeconds / 60)} minutes</p>
                            </div>
                        )}

                        {movie?.rating?.aggregateRating && (
                            <div>
                                <span className="font-semibold">Rating:</span>
                                <p className="text-yellow-500 text-lg">★ {movie.rating?.aggregateRating}/10</p>
                            </div>
                        )}
                        {movie?.plot && (
                            <div>
                                <span className="font-semibold">Description:</span>
                                <p>{movie.plot}</p>
                            </div>
                        )}
                        {movie?.genres && (
                            <div>
                                <span className="font-semibold">Genres:</span>
                                <p>{movie.genres.join(', ')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}