import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/favorites';
import History from './pages/history';

function App() {

  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/movie/:id" element = {<MovieDetails />} />
       <Route path="/favorites" element={<Favorites />} />
       <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
