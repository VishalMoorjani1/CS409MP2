import axios from 'axios';
import { Pokemon } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

interface PokemonListItem {
  name: string;
  url: string;
}

export const getIds = async (): Promise<PokemonListItem[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon?limit=${100}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error;
  }
};

export const getOneData = async (nameOrId: string | number): Promise<Pokemon> => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${nameOrId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Pokemon ${nameOrId}:`, error);
    throw error;
  }
};

export const getAllData = async (): Promise<Pokemon[]> => {
  try {
    const list = await getIds();
    const promises = list.map(pokemon => getOneData(pokemon.name));
    const pokemonDetails = await Promise.all(promises);
    return pokemonDetails;
  } catch (error) {
    console.error('Error fetching multiple Pokemon:', error);
    throw error;
  }
};