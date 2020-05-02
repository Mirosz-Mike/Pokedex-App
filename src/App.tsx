import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import PageNotFound from './pages/PageNotFound';
import PokemonEdit from './pages/PokemonEdit';
import PokemonAdd from './pages/PokemonAdd';
import PokemonLogin from './pages/PokemonLogin';
import PrivaRoute from './PrivateRoute';
// renomme ma fonction pour etre plus explicite
import { default as randomColor } from './helpers/randomArr';

const App: FunctionComponent = () => {
  const arrColor = ['#009688', '#2B448C', '#F2B90C', '#F2A30F', '#D16C51', '#3B8481', '#FEBF4C'];

  return (
    <Router>
      <div>
        <nav>
          <div className="nav-wrapper" style={{ backgroundColor: `${randomColor(arrColor)}` }}>
            <Link to="/" className="brand-logo center">
              Pokédex
            </Link>
          </div>
        </nav>

        <Switch>
          <PrivaRoute exact path="/" component={PokemonList} />
          <PrivaRoute exact path="/pokemons" component={PokemonList} />
          <Route exact path="/login" component={PokemonLogin} />
          <PrivaRoute exact path="/pokemons/edit/:id" component={PokemonEdit} />
          <PrivaRoute exact path="/pokemons/add" component={PokemonAdd} />
          <PrivaRoute path="/pokemons/:id" component={PokemonDetail} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
