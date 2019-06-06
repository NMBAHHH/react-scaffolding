import * as homeApi from '../servers/home.jsx';
import { createAction } from 'redux-actions';

export const INCREASE = 'INCREASE';
export function increase(params) {
    return {
        type: INCREASE,
        payload: homeApi.getCard(params)
    };
}