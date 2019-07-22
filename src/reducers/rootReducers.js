// reducers配置文件
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import orderList from './orderList';
const rootReducers = combineReducers({
    orderList,
    router: routerReducer
});
export default rootReducers;