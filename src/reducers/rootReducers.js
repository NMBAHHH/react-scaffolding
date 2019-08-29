// reducers配置文件
import { routerReducer } from 'react-router-redux';
import orderList from './orderList';

// 保存当前正在执行的action type
const combineReducers = (reducers) => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce((nextState, key) => {
            nextState[key] = reducers[key](state[key], action);
            return nextState;
        }, { actionType: action.type });
    };
};

const rootReducers = combineReducers({
    orderList,
    router: routerReducer
});
export default rootReducers;