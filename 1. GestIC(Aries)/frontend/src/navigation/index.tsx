import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { routes } from './routes';
import { useAuth } from '../providers/AuthProvider';

function PrivateRoute({ component: Component, context, roles, ...rest }) {
  const history = useHistory();
  const { user } = context;

  if (!user) {
    return <Redirect to="/login" />;
  }

  if (roles.length) {
    if (roles.include(user.profileTag)) {
      return <Route {...rest} render={props => <Component {...props} context={context} history={history} />} />;
    }
  } else {
    return <Route {...rest} render={props => <Component {...props} context={context} history={history} />} />;
  }

  return <Redirect to="/" />;
}

function PublicRoute({ component: Component, context, ...rest }) {
  const history = useHistory();

  return <Route {...rest} render={props => <Component {...props} context={context} history={history} />} />;
}

export const Navigation = () => {
  const context = useAuth();

  return (
    <Switch>
      {routes.map(route =>
        route.private ? (
          <PrivateRoute
            roles={route.roles}
            key={route.path}
            path={route.path}
            exact
            component={route.component}
            context={context}
          />
        ) : (
          <PublicRoute key={route.path} path={route.path} exact component={route.component} context={context} />
        ),
      )}
      <Redirect to="/" exact />
    </Switch>
  );
};
