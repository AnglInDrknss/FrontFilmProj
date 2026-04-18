import { useParams } from "react-router-dom"
import { getMovieById } from "../services/api";
import { useEffect, useState } from "react";


export default function MovieDetails() {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        getMovieById(id!).then((data) => {
            setMovie(data);
        });
    }, [id]);
    
    return (
        <div>
            <h1>{movie?.originalTitle}</h1>
            <img src={movie?.primaryImage?.url} alt={""} />
            <p>{movie?.plot}</p>
        </div>
    )
}