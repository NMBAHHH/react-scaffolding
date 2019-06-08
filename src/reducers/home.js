import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { createReducer } from 'redux-immutablejs';
import { 
    INCREASE,
    TEST2
} from './../actions/Home';

const initialState = fromJS({
    data: {},
    data2: {}
});

export default createReducer(initialState, {
    [INCREASE]: (state, { payload }) => {
        return state.set('data', payload);
    },
    [TEST2]: (state, { payload }) => {
        return state.set('data2', payload);
    }
});