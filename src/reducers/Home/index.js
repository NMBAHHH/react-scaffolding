import { handleActions } from 'redux-actions';
import { INCREASE } from './../../actions/Home';

const initialState = {};

const todos = handleActions({
    [INCREASE]: (state, action) => {
        const { payload } = action;
        return {
            ...state,
            ...payload
        }
    },
}, initialState);

export default todos;
