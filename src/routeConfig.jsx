// 路由配置文件
import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const Chart = lazy(() => import('./pages/Chart/index'));
const Table = lazy(() => import('./pages/Table/index'));

const routes = [
    {
        path: '/home',
        component: Table
    },
    {
        path: '/chart',
        component: Chart
    },
    {
        path: '/table',
        component: Table
    }
];

const RouteWithSubRoutes = route => (
    <Route
        exact
        path={route.path}
        render={props => (
            <route.component {...props} routes={route.routes} />
        )}
    />
);

const routeConfig = routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />);
export default routeConfig;
