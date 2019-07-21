// 路由配置文件
import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const Dashboard = lazy(() => import(/* webpackChunkName: "dashboard"*/'./pages/Dashboard/index'));
const orderList = lazy(() => import(/* webpackChunkName: "orderList"*/'./pages/orderList/index'));
const addGoods = lazy(() => import(/* webpackChunkName: "addGoods"*/'./pages/AddGoods/index'));
const routes = [
    {
        path: '/dashboard',
        component: Dashboard
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
