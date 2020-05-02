import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import usePokemons from '../hooks/usePokemons';
import PokemonSearch from '../components/PokemonSearch';
import PokemonLoader from '../components/PokemonLoader';

const PokemonList: FunctionComponent = () => {
  const pokemons = usePokemons();

  return (
    <div>
      <h1 className="center">Pokédex</h1>
      <div className="center">
        <Link to="/pokemons/add" className="brand-logo center btn halfway-fab waves-effect red waves-light">
          <i className="material-icons">add</i>
        </Link>
      </div>

      <div className="container">
        <div className="row">
          <PokemonSearch />
          {pokemons.length ? (
            pokemons.map((pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
          ) : (
            <h4 className="center">
              {' '}
              <PokemonLoader />
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
