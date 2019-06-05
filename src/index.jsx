import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import logger from 'redux-logger';
import promise from 'redux-promise';
import { ConnectedRouter } from 'react-router-redux';
import router from './router';
import rootReducers from './reducers/index';

const history = createBrowserHistory();

const store = createStore(
    rootReducers,
    applyMiddleware(promise, logger),
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
