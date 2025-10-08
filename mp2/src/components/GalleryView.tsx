import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pokemon } from '../types/pokemon';
import './GalleryView.css';

interface GalleryViewProps {
  allPokemon: Pokemon[];
}

const GalleryView: React.FC<GalleryViewProps> = ({ allPokemon }) => {
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>(allPokemon);
  const [selectedTypes, setSelectedTypes] = useState<string>("");

  const allTypes = Array.from(new Set(allPokemon.flatMap(pokemon => pokemon.types.map(t => t.type.name)))).sort();

  useEffect(() => {
    if (selectedTypes === "") {
      setFilteredPokemon(allPokemon);
    } else {
      const filtered = allPokemon.filter(pokemon =>
        pokemon.types.some(t => selectedTypes.includes(t.type.name))
      );
      setFilteredPokemon(filtered);
    }
  }, [selectedTypes, allPokemon]);

  const toggleType = (type: string) => {
    if (selectedTypes === type) {
      setSelectedTypes("");
    } else {
      setSelectedTypes(type);
    }
  };

  return (
    <div id="gallery">
      <h1>Gallery</h1>

      <div className="type-filters">
        {allTypes.map(type => (
          <button key={type} className={`filter ${type}-type`} onClick={() => toggleType(type)}>
            {type}
          </button>
        ))}
      </div>

      <div className="images">
        {filteredPokemon.map(pokemon => {
          const imageUrl = pokemon.sprites.other['official-artwork'].front_default;
          const types = pokemon.types.map(t => t.type.name);

          return (
            <Link key={pokemon.id} to={`/detail/${pokemon.id}`} className="pokemon-card">
              <div className="image-wrapper">
                <img src={imageUrl} className="pokemon-image" alt="Pokemon"
                />
              </div>
              <div className="pokemon-info">
                <p>#{pokemon.id}</p>
                <p>{pokemon.name}</p>
                <div className="types">
                  {types.map(type => (
                    <span key={type} className={`type ${type}-type`}>
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default GalleryView;