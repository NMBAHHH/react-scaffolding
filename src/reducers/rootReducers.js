// reducers配置文件
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import home from './Home/index';
const rootReducers = combineReducers({
    home,
    router: routerReducer,
});
export default rootReducers;