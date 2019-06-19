import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import isPromise from 'is-promise';
import { isFSA } from 'flux-standard-action';
import Home from '../src/pages/Home/index';
import rootReducers from './reducers/rootReducers';
function middleware({ dispatch }) {
    return next => action => {
        if (!isFSA(action)) {
            return next(action);
        }
        if(isPromise(action.payload)) {
            dispatch({ ...action, payload: { isLoading: true } });
            return action.payload
                .then(result => {
                    result.isLoading = false;
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
