import {useState} from 'react';
import { searchMovies } from '../services/api';


export default function Home() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const handleSearch = async () => {
        searchMovies(query).then((data) => {
            setMovies(data.titles);
        });
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
                        <h3>{movie.originalTitle}</h3>
                    </div>
                ))}
            </div>
        </div>

    );
}