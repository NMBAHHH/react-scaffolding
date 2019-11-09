import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { Provider } from 'react-redux';
import { Switch, Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxMiddleware from 'redux-promise-plus';
import { createHashHistory } from 'history';
import Home from '../src/pages/Home/index';
import rootReducers from './reducers/rootReducers';

const history = createHashHistory();

const store = createStore(
    rootReducers,
    applyMiddleware(reduxMiddleware),
);

ReactDOM.render(
    <ConfigProvider locale={zh_CN}>
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Home />
                </Switch>
            </Router>
        </Provider>
    </ConfigProvider>,
    document.getElementById('root'),
);
