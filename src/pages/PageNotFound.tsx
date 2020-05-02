import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { POKEMONS } from '../models/mock-pokemons';
// renomme ma fonction pour etre plus explicite
import { default as randomPicture } from '../helpers/randomArr';

const PageNotFound: FunctionComponent = () => {
  const arrPicture = POKEMONS.map(({ picture }) => picture.replace(/detail/, 'full'));

  return (
    <div className="center">
      <img src={randomPicture(arrPicture)} alt="Page non trouvée" />
      <h1>Hey, cette page n'existe pas !</h1>
      <Link to="/" className="waves-effect waves-teal btn-flat">
        Retourner à l'accueil
      </Link>
    </div>
  );
};

export default PageNotFound;
