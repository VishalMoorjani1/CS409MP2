import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pokemon } from '../types/pokemon';
import './ListView.css';

interface ListViewProps {
  allPokemon: Pokemon[];
}

const ListView: React.FC<ListViewProps> = ({ allPokemon }) => {
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [query, setQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'id'>('id');
  const [sortOrder, setSortOrder] = useState<'ascending' | 'descending'>('ascending');

  useEffect(() => {
    let filtered = allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );

    filtered = filtered.sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else {
        comparison = a.id - b.id;
      }

      return sortOrder === 'ascending' ? comparison : -comparison;
    });

    setFilteredPokemon(filtered);
  }, [query, sortBy, sortOrder, allPokemon]);

  return (
    <div id="list">
      <h1>List of 100 Pokemon</h1>

      <div id="search-box">
        <input type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} id="search-query"/>
      </div>

      <div id="sorting">
        <div className="sort-options">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'name' | 'id')}>
            <option value="id">ID</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div className="sort-options">
          <label>Order:</label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'ascending' | 'descending')}>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
      </div>

      <ul className="list-items">
        {filteredPokemon.map((pokemon) => (
          <li key={pokemon.id} className="list-item">
            <Link to={`/detail/${pokemon.id}`} className="details-link">
              <span className="pokemon-id">#{pokemon.id}</span>
              <span className="pokemon-name">{pokemon.name}</span>
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default ListView;