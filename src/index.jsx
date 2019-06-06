import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import isPromise from 'is-promise';
import { isFSA } from 'flux-standard-action';
import promise from 'redux-promise';
import { ConnectedRouter } from 'react-router-redux';
import router from './router';
import rootReducers from './reducers/rootReducers';

const history = createBrowserHistory();

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
                    result.isLoading = false;
                    dispatch({ ...action, payload: error, error: true})
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
        <ConnectedRouter history={history}>
            <div>
                {router}
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);
