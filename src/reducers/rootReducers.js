// reducers配置文件
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import table from './table';
const rootReducers = combineReducers({
    table,
    router: routerReducer
});
export default rootReducers;