// 路由配置文件
import React from 'react';
import { Route } from 'react-router-dom';
import AsyncCompnent from './components/AsyncComponent/index';
const Chart = AsyncCompnent(() => import("./pages/Chart/index"));
const Table = AsyncCompnent(() => import("./pages/Table/index"));

const routes = [
    {
        path: '/home',
        component: Table,
    },
    {
        path: '/chart',
        component: Chart,
    },
    {
        path: '/table',
        component: Table
    },
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

// eslint-disable-next-line react/no-array-index-key
const routeConfig = routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />);
export default routeConfig;
