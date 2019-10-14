import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { Provider } from 'react-redux';
import { Switch, Router } from 'react-router-dom';
import io from 'socket.io-client';
import { createStore, applyMiddleware } from 'redux';
import { createHashHistory } from 'history';
import isPromise from 'is-promise';
import Home from '../src/pages/Home/index';
import rootReducers from './reducers/rootReducers';

const history = createHashHistory();

window.socket = io(process.env.NODE_ENV === 'production' ? 'https://downfuture.com:9000' : 'http://localhost:9000', {secure: true});

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
    <LocaleProvider locale={zh_CN}>
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Home />
                </Switch>
            </Router>
        </Provider>
    </LocaleProvider>,
    document.getElementById('root'),
);
