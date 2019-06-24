import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import isPromise from 'is-promise';
import Home from '../src/pages/Home/index';
import rootReducers from './reducers/rootReducers';
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
    <Provider store={store}>
        <Home />
    </Provider>,
    document.getElementById('root'),
);
