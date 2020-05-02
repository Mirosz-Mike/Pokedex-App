import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticatedBoolean } from './services/authentificationService';

const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) => {
      const isAuth: boolean = isAuthenticatedBoolean;
      if (!isAuth) {
        return <Redirect to={{ pathname: '/login' }} />;
      }

      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
