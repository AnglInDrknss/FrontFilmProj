import { getFavorites } from "../services/favorites"

export default function Favorites() {
    
    
    return (
        <div>
            <h1>Favorites</h1>
            <ul>
                {getFavorites().map((favorite) => (
                    <li key={favorite}>Movie ID: {favorite}</li>
                ))}
            </ul>
        </div>
    )
}