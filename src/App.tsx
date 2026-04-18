import { useState } from 'react'
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/favorites';

function App() {

  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/movie/:id" element = {<MovieDetails />} />
       <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
