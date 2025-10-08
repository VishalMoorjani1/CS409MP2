import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ListView from './components/ListView';
import GalleryView from './components/GalleryView';
import DetailView from './components/DetailView';
import { getAllData } from './services/api';
import { Pokemon } from './types/pokemon';
import './App.css';

function App() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const data = await getAllData();
        setAllPokemon(data);
      } catch (error) {
        console.error('Failed to fetch Pokemon:', error);
      }
    };

    fetchAllPokemon();
  }, []);

  return (
    <BrowserRouter basename='/CS409MP2'>
      <div className="App">
        <nav className="navbar">
          <div className="nav-links">
            <Link to="/">List View</Link>
            <Link to="/gallery">Gallery View</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<ListView allPokemon={allPokemon} />} />
          <Route path="/gallery" element={<GalleryView allPokemon={allPokemon} />} />
          <Route path="/detail/:id" element={<DetailView allPokemon={allPokemon} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;