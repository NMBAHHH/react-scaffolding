// 路由配置文件
import React from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/Home/index';
import About from './pages/About/index';

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/about',
        component: About,
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
