import { fromJS } from 'immutable';
import { createReducer } from 'redux-immutablejs';
import {
    GET_TABLE,
    GET_TABLE_TEST
} from './../actions/orderList';

const initialState = fromJS({
    orderListData: {}
});

export default createReducer(initialState, {
    [GET_TABLE]: (state, { payload }) => {
        return state.set('orderListData', payload);
    },
    [GET_TABLE_TEST]: (state, { params }) => {
        return state.set('orderListData', params);
    }
});