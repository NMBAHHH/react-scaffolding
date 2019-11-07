import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { Provider } from 'react-redux';
import { Switch, Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { createHashHistory } from 'history';
import isPromise from 'is-promise';
import Home from '../src/pages/Home/index';
import rootReducers from './reducers/rootReducers';

const history = createHashHistory();

function middleware({ dispatch }) {
    return next => action => {
        if(isPromise(action.payload)) {
            dispatch({ ...action, payload: { isLoading: true } });
            return action.payload
                .then(result => {
                    result.isLoading = false;
                    dispatch({ ...action, payload: result});
                })
                .catch(error => {
                    error.isLoading = false;
                    dispatch({ ...action, payload: error, error: true});
                });
        }
        return next(action);
    };
}

const store = createStore(
    rootReducers,
    applyMiddleware(middleware),
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
