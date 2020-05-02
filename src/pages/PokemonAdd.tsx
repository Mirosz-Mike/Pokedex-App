import React, { FunctionComponent, useState } from 'react';

import Pokemon from '../models/pokemon';
import PokemonForm from '../components/PokemonForm';

const PokemonAdd: FunctionComponent = () => {
  const [id] = useState<number>(new Date().getTime());
  const [pokemon] = useState<Pokemon>(new Pokemon(id));

  return (
    <div className="row">
      <h1 className="header center">Ajouter un pokémon</h1>
      <PokemonForm pokemon={pokemon} isEditForm={false} />
    </div>
  );
};

export default PokemonAdd;
