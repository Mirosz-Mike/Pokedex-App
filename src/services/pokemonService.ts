import Pokemon from '../models/pokemon';
import POKEMONS from '../models/mock-pokemons';

const pokemons: Pokemon[] = POKEMONS;

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

// GET
export const getPokemons = (): Promise<Pokemon[]> => {
  if (isDev) {
    return fetch('http://localhost:3002/pokemons')
      .then((res) => res.json())
      .catch((error) => handleError(error));
  }
  return new Promise((resolve) => {
    resolve(pokemons);
  });
};

export const getPokemon = (id: number): Promise<Pokemon | null> => {
  if (isDev) {
    return fetch(`http://localhost:3002/pokemons/${id}`)
      .then((response) => response.json())
      .then((data) => (isEmpty(data) ? null : data))
      .catch((error) => handleError(error));
  }
  return new Promise((resolve) => {
    resolve(pokemons.find((pokemon) => id === pokemon.id));
  });
};

// POST
export const addPokemon = (pokemon: Pokemon): Promise<Pokemon> => {
  pokemon.created = new Date(pokemon.created);

  if (isDev) {
    return fetch(`http://localhost:3002/pokemons`, {
      method: 'POST',
      body: JSON.stringify(pokemon),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .catch((error) => handleError(error));
  }

  return new Promise((resolve) => {
    pokemons.push(pokemon);
    resolve(pokemon);
  });
};

// PUT
export const updatePokemon = (pokemon: Pokemon): Promise<Pokemon> => {
  if (isDev) {
    return fetch(`http://localhost:3002/pokemons/${pokemon.id}`, {
      method: 'PUT',
      body: JSON.stringify(pokemon),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .catch((error) => handleError(error));
  }

  return new Promise((resolve) => {
    const { id } = pokemon;
    const index = pokemons.findIndex((pokemon) => pokemon.id === id);
    pokemons[index] = pokemon;
    resolve(pokemon);
  });
};

//DELETE
export const deletePokemon = (pokemon: Pokemon): Promise<{}> => {
  if (isDev) {
    return fetch(`http://localhost:3002/pokemons/${pokemon.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .catch((error) => handleError(error));
  }

  return new Promise((resolve) => {
    const { id } = pokemon;
    pokemons.filter((pokemon) => pokemon.id !== id);
    resolve({});
  });
};

//SEARCH POKEMON
export const searchPokemon = (term: string): Promise<Pokemon[]> => {
  if (isDev) {
    return fetch(`http://localhost:3002/pokemons?q=${term}`)
      .then((res) => res.json())
      .catch((error) => handleError(error));
  }

  return new Promise((resolve) => {
    const results = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(term.toLowerCase()));
    resolve(results);
  });
};

// Helpers
const isEmpty = (data: Object): boolean => {
  return Object.keys(data).length === 0;
};

const handleError = (error: Error): void => console.error(error);
