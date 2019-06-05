import { handleActions } from 'redux-actions';

const initialState = {
    count: 0 
};

const todos = handleActions({
    INCREASE: (state, action) => {
        const { payload } = action;
        return {
            ...state,
            count: payload + 1
        }
    },
    DECREASE: (state, action) => {
        const { payload } = action;
        return {
            ...state,
            count: payload - 1
        }
    }
}, initialState);

export default todos;
