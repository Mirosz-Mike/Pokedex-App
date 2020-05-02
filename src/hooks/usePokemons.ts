import { useState, useEffect } from 'react';
import Pokemon from '../models/pokemon';
import { getPokemons } from '../services/pokemonService';

const usePokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    getPokemons().then((pokemons) => setPokemons(pokemons));
  }, []);

  return pokemons;
};

export default usePokemons;
