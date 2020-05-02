import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../services/authentificationService';

type Field = {
  value?: any;
  error?: string;
  isValid?: boolean;
};

type Form = {
  username: Field;
  password: Field;
};

const PokemonLogin: FunctionComponent = () => {
  const history = useHistory();

  const [form, setForm] = useState<Form>({
    username: { value: '' },
    password: { value: '' },
  });

  const [message, setMessage] = useState<string>('Vous êtes déconnecté. (ID : pikachu / MDP : pikachu)');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField });
  };

  const validateForm = () => {
    let newForm: Form = form;
    const correctValidator = { value: '', error: '', isValid: true };

    // Validator username
    // cette regex /^[\s\S]{3,}$/ est équivalente à form.username.value.length < 3
    // le \s représente tout les espaces blancs, et le \S tout ce qui ne l'est pas. Du coup, les deux ensemble valident absolument tout.

    const validatorUsername = !/^[\s\S]{3,}$/.test(form.username.value)
      ? { value: form.username.value, error: 'Votre prénom doit faire au moins 3 caractères de long.', isValid: false }
      : { ...correctValidator, value: form.username.value };

    // Validator password
    const validatorPassword = !/^[\s\S]{6,}$/.test(form.password.value)
      ? {
          value: form.password.value,
          error: 'Votre mot de passe doit faire au moins 6 caractères de long.',
          isValid: false,
        }
      : { ...correctValidator, value: form.password.value };

    newForm = { ...newForm, ...{ username: validatorUsername, password: validatorPassword } };
    setForm(newForm);

    return newForm.username.isValid && newForm.password.isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      setMessage('👉 Tentative de connexion en cours ...');
      login(form.username.value, form.password.value).then((isAuthenticated) => {
        if (!isAuthenticated) {
          setMessage('🔐 Identifiant ou mot de passe incorrect.');
          return;
        }

        history.push('/pokemons');
      });
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            <div className="card-stacked">
              <div className="card-content">
                {/* Form message */}
                {message && (
                  <div className="form-group">
                    <div className="card-panel grey lighten-5">{message}</div>
                  </div>
                )}
                {/* Field username */}
                <div className="form-group">
                  <label htmlFor="username">Identifiant</label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    className="form-control"
                    value={form.username.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {/* error */}
                  {form.username.error && <div className="card-panel red accent-1">{form.username.error}</div>}
                </div>
                {/* Field password */}
                <div className="form-group">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-control"
                    value={form.password.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {/* error */}
                  {form.password.error && <div className="card-panel red accent-1">{form.password.error}</div>}
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

export default PokemonLogin;
