import { fromJS } from 'immutable';
import { createReducer } from 'redux-immutablejs';
import {
    GET_TABLE
} from './../actions/table';

const initialState = fromJS({
    tableData: {}
});

export default createReducer(initialState, {
    [GET_TABLE]: (state, { payload }) => {
        return state.set('tableData', payload);
    }
});