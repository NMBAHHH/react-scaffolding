// 路由配置文件
import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const chart = lazy(() => import(/* webpackChunkName: "chart"*/'./pages/Chart/index'));
const orderList = lazy(() => import(/* webpackChunkName: "orderList"*/'./pages/orderList/index'));
const addGoods = lazy(() => import(/* webpackChunkName: "addGoods"*/'./pages/AddGoods/index'));
const routes = [
    {
        path: '/chart',
        component: chart
    },
    {
        path: '/order/list',
        component: orderList
    },
    {
        path: '/add/goods',
        component: addGoods
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
