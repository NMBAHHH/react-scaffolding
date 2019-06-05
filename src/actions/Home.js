import * as homeApi from '../servers/home.jsx';
import { createAction } from 'redux-actions';

const increase = createAction('INCREASE');
const decrease = createAction('DECREASE');

export {
    increase,
    decrease
};