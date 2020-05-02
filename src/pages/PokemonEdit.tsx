import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PokemonForm from '../components/PokemonForm';
import Pokemon from '../models/pokemon';
import { getPokemon } from '../services/pokemonService';
import PokemonLoader from '../components/PokemonLoader';

type Params = { id: string };

const PokemonEdit: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    getPokemon(+match.params.id).then((pokemon) => setPokemon(pokemon));
  }, [match.params.id]);

  return (
    <div>
      {pokemon ? (
        <div className="row">
          <h2 className="header center">Éditer {pokemon.name}</h2>
          <PokemonForm pokemon={pokemon} isEditForm={true} />
        </div>
      ) : (
        <h4 className="center">
          {' '}
          <PokemonLoader />
        </h4>
      )}
    </div>
  );
};

export default PokemonEdit;
