import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Pokemon from '../models/pokemon';
import formatDate from '../helpers/formatDate';
import formatType from '../helpers/formatType';
// renomme ma fonction pour etre plus explicite
import { default as randomColor } from '../helpers/randomArr';
import './PokemonCard.css';

type Props = {
  pokemon: Pokemon;
};

const PokemonCard: FunctionComponent<Props> = ({ pokemon }) => {
  const { name, picture, created, types, id } = pokemon;

  const history = useHistory();
  const [color, setColor] = useState<String>();

  const showBorder = () => {
    const arrColor = ['#009688', '#2B448C', '#F2F2F2', '#F2B90C', '#F2A30F', '#D16C51', '#3B8481', '#FEBF4C'];

    setColor(randomColor(arrColor));
  };

  const hideBorder = () => setColor('#f5f5f5');

  const goToPokemon = (id: number) => {
    history.push(`/pokemons/${id}`);
  };

  return (
    <div className="col s6 m4" onMouseEnter={showBorder} onMouseLeave={hideBorder}>
      <div className="card horizontal" onClick={() => goToPokemon(id)} style={{ borderColor: `${color}` }}>
        <div className="card-image">
          <img src={picture} alt={name} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{name}</p>
            <p>
              <small>{formatDate(created)}</small>
            </p>
            {types.map((type) => (
              <span key={type} className={formatType(type)}>
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
