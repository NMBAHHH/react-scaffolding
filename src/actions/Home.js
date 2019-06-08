import * as api from '../servers/home.jsx';

export const INCREASE = 'INCREASE';
export function increase(params) {
    return {
        type: INCREASE,
        payload: api.getCard(params)
    };
}

export const TEST2 = 'TEST2';
export function test2(params) {
    return {
        type: TEST2,
        payload: {
            bbb: 123
        }
    };
}