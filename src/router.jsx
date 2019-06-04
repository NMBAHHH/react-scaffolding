import React from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/Home/index';

const routes = [
    {
        path: '/',
        component: Home,
    },
];

const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        exact
        render={props => (
            <route.component {...props} routes={route.routes} />
        )}
    />
);

// eslint-disable-next-line react/no-array-index-key
const routeConfig = routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />);
export default routeConfig;
