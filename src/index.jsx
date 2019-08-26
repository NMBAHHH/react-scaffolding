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
        if(!action.isLoading) {
            return next(action);
        }
        if(isPromise(action.payload)) {
            if(action.isLoading) {
                dispatch({ ...action, payload: { isLoading: action.isLoading } });
            }
            return action.payload
                .then(result => {
                    dispatch({ ...action, payload: result});
                })
                .catch(error => {
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
