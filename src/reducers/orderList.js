import { fromJS } from 'immutable';
import { createReducer } from 'redux-immutablejs';
import {
    GET_TABLE
} from './../actions/orderList';

const initialState = fromJS({
    orderListData: {}
});

export default createReducer(initialState, {
    [GET_TABLE]: (state, { payload }) => {
        return state.set('orderListData', payload);
    }
});