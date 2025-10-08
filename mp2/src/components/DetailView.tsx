import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Pokemon } from '../types/pokemon';
import './DetailView.css';

interface DetailViewProps {
  allPokemon: Pokemon[];
}

const DetailView: React.FC<DetailViewProps> = ({ allPokemon }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const currentPokemon = allPokemon.find(p => p.id === parseInt(id || '0'));
  const currentIndex = allPokemon.findIndex(p => p.id === parseInt(id || '0'));

  if (!currentPokemon) {
    return (
      <div className="detail-view">
        <h2>Pokemon not found!</h2>
      </div>
    );
  }

  const isFirst = currentIndex > 0;
  const isLast = currentIndex < allPokemon.length - 1;
  const previousId = isFirst ? allPokemon[currentIndex - 1].id : null;
  const nextId = isLast ? allPokemon[currentIndex + 1].id : null;
  const types = currentPokemon.types.map(t => t.type.name);

  return (
    <div className="details">
      <div className="nav-buttons">
        <button className="nav-button prev-button" onClick={() => previousId && navigate(`/detail/${previousId}`)} disabled={!isFirst}> Previous </button>

        <button className="nav-button next-button" onClick={() => nextId && navigate(`/detail/${nextId}`)} disabled={!isLast}> Next </button>
      </div>

      <div className="pokemon-card">

        <div className="stats-wrapper">
          <div className="nameid">
            <h1 className="name">{currentPokemon.name}</h1>
            <span className="id">#{currentPokemon.id}</span>
          </div>

          <div className="types-wrapper">
            <div className="types">
              {types.map(type => (
                <span className={`type ${type}-type`}>{type}</span>
              ))}
            </div>
          </div>

          <div>
            <div className="stats">
              <div className="stat">
                <span className="stat-type">Height</span>
                <span className="stat-val">{currentPokemon.height / 10} m</span>
              </div>
              <div className="stat">
                <span className="stat-type">Weight</span>
                <span className="stat-val">{currentPokemon.weight / 10} kg</span>
              </div>
            </div>
          </div>
        </div>

        <div className="image-wrapper-lol-wut">
          <img src={currentPokemon.sprites.other['official-artwork'].front_default}/>
        </div>
      </div>
    </div>
  );
};

export default DetailView;