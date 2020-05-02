import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Pokemon from '../models/pokemon';
import formatType from '../helpers/formatType';
import { updatePokemon, deletePokemon, addPokemon } from '../services/pokemonService';

type Props = {
  pokemon: Pokemon;
  isEditForm: boolean;
};

type Field = {
  value?: any;
  error?: string;
  isValid?: boolean;
};

type Form = {
  name: Field;
  hp: Field;
  cp: Field;
  types: Field;
  picture: Field;
};

const PokemonForm: FunctionComponent<Props> = ({ pokemon, isEditForm }) => {
  const [form, setForm] = useState<Form>({
    name: { value: pokemon.name, isValid: true },
    hp: { value: pokemon.hp, isValid: true },
    cp: { value: pokemon.cp, isValid: true },
    types: { value: pokemon.types, isValid: true },
    picture: { value: pokemon.picture },
  });

  const history = useHistory();

  const types: string[] = [
    'Plante',
    'Feu',
    'Eau',
    'Insecte',
    'Normal',
    'Electrik',
    'Poison',
    'Fée',
    'Vol',
    'Combat',
    'Psy',
  ];

  // pour mettre par defaut en checked les types par defaut du pokemon
  const hasType = (type: string): boolean => form.types.value.includes(type);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField });
  };

  // cette fonction permet de savoir ce qui est check et enlever ou ajouter dans notre tableau types les types ["eau", "plante" ...]
  const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>): void => {
    const checked = e.target.checked;
    const addType: string[] = [...form.types.value, type];
    const removeType: string[] = form.types.value.filter((currentType: string) => currentType !== type);

    const result = checked ? addType : removeType;
    setForm({ ...form, ...{ types: { value: result } } });
  };

  const validateForm = () => {
    let newForm: Form = form;

    const correctValidator = { value: '', error: '', isValid: true };
    const validEditForm = newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;

    // Validator url
    if (!isEditForm) {
      const start = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';
      const end = '.png';

      if (
        !form.picture.value.startsWith(start) ||
        !form.picture.value.endsWith(end) ||
        form.picture.value ===
          'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/<mettre un nombre a 3 chiffres>.png'
      ) {
        newForm = {
          ...newForm,
          picture: { value: form.picture.value, error: "L'url n'est pas valide.", isValid: false },
        };
      } else {
        return { ...correctValidator, value: form.picture.value };
      }
    }

    const validatorName = !/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)
      ? { value: form.name.value, error: 'Le nom du pokémon est requis (1-25).', isValid: false }
      : { ...correctValidator, value: form.name.value };

    const validatorHP = !/^[0-9]{1,3}$/.test(form.hp.value)
      ? { value: form.hp.value, error: 'Les points de vie du pokémon sont compris entre 0 et 999.', isValid: false }
      : { ...correctValidator, value: form.hp.value };

    const validatorCP = !/^[0-9]{1,2}$/.test(form.cp.value)
      ? { value: form.cp.value, error: 'Les dégâts du pokémon sont compris entre 0 et 99', isValid: false }
      : { ...correctValidator, value: form.hp.value };

    newForm = { ...newForm, ...{ name: validatorName, hp: validatorHP, cp: validatorCP } };
    setForm(newForm);

    return isEditForm ? validateForm : validEditForm && newForm.picture.isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = validateForm();
    const { name, hp, cp, types } = form;

    if (isFormValid) {
      pokemon.name = name.value;
      pokemon.hp = hp.value;
      pokemon.cp = cp.value;
      pokemon.types = types.value;
      pokemon.picture = form.picture.value;

      return isEditForm ? updatePok() : addPok();
    }
  };

  const isTypesValid = (type: string): boolean => {
    const valueLength = form.types.value.length;

    // ici je m'assure avant la validation que j'ai au minimum un type selectionner afin d'éviter qu'aucun type ne soit selectionner
    if (valueLength === 1 && hasType(type)) return false;

    // ici je m'assure qu'il peut selectionner jusqu'a 3 types mais aussi pouvoir deselectionner
    if (valueLength >= 3 && !hasType(type)) return false;

    return true;
  };

  const addPok = () => addPokemon(pokemon).then(() => history.push('/pokemons'));

  const updatePok = () => updatePokemon(pokemon).then(() => history.push(`/pokemons/${pokemon.id}`));

  const deletePok = () => deletePokemon(pokemon).then(() => history.push('/pokemons'));

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            {isEditForm && (
              <div className="card-image">
                <img src={pokemon.picture} alt={pokemon.name} style={{ width: '250px', margin: '0 auto' }} />
                <span className="btn-floating halfway-fab waves-effect waves-light">
                  <i onClick={deletePok} className="material-icons">
                    delete
                  </i>
                </span>
              </div>
            )}
            <div className="card-stacked">
              <div className="card-content">
                {/* Pokemon picture */}
                {!isEditForm && (
                  <div className="form-group">
                    <label htmlFor="picture">Image du pokemon</label>
                    <input
                      id="picture"
                      type="text"
                      className="form-control"
                      value={form.picture.value}
                      name="picture"
                      onChange={(e) => handleInputChange(e)}
                    ></input>
                    {form.picture.error && <div className="card-panel red accent-1">{form.picture.error}</div>}
                  </div>
                )}
                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    value={form.name.value}
                    name="name"
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {form.name.error && <div className="card-panel red accent-1">{form.name.error}</div>}
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input
                    id="hp"
                    type="number"
                    className="form-control"
                    value={form.hp.value}
                    name="hp"
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {form.hp.error && <div className="card-panel red accent-1">{form.hp.error}</div>}
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input
                    id="cp"
                    type="number"
                    className="form-control"
                    value={form.cp.value}
                    name="cp"
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {form.cp.error && <div className="card-panel red accent-1">{form.cp.error}</div>}
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map((type) => (
                    <div key={type} style={{ marginBottom: '10px' }}>
                      <label>
                        <input
                          id={type}
                          type="checkbox"
                          className="filled-in"
                          value={type}
                          checked={hasType(type)}
                          onChange={(e) => selectType(type, e)}
                          disabled={!isTypesValid(type)}
                        ></input>
                        <span>
                          <p className={formatType(type)}>{type}</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PokemonForm;
