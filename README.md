# 特点
1. 不需要重复定义action，比如等待Action、成功Actoin、失败Action。写更少的action，做更多的事。
```
export const GET_TABLE = 'GET_TABLE';
export function getTable(params) {
    return {
        type: GET_TABLE,
        payload: api.getTable(params)
    };
}
```
2. 自定义中间件，帮助处理action无法完成的事。
```
function middleware({ dispatch }) {
    return next => action => {
        if (!isFSA(action)) {
            return next(action);
        }

        if(isPromise(action.payload)) {
            dispatch({ ...action, payload: { isLoading: true } });
            return action.payload
                .then(result => {
                    result.isLoading = false;
                    dispatch({ ...action, payload: result});
                })
                .catch(error => {
                    result.isLoading = false;
                    dispatch({ ...action, payload: error, error: true})
                });
        }
        return next(action);
    };
}
```
3. reducer纯函数式管理，更简洁，持久化数据结构。
```
import { fromJS } from 'immutable';
import { createReducer } from 'redux-immutablejs';
import {
    GET_TABLE,
} from './../actions/table';

const initialState = fromJS({
    tableData: {},
});

export default createReducer(initialState, {
    [GET_TABLE]: (state, { payload }) => {
        return state.set('tableData', payload);
    },
});
```
4. 路由完全匹配导航，包含url输入，js跳转。

# 环境
```
npm ^6.5.0
node ^11.4.0
```

# 启动
```
$ git clone https://github.com/xuya227939/react-scaffolding.git

$ cd react-scaffolding

$ npm install

$ npm start
```

# 部署
```
$ npm run build
```
将dist文件夹放到服务器，配置nginx访问即可

# 目录结构
<pre>
.
├── public
│   └── index.html
├── src                              # 主入口
│   ├── actions                      # action层
│   │   └── table.js
│   ├── components                   # 页面共享组件
│   │   ├── AsyncComponent
│   │   │   └── index.jsx
│   │   ├── LayoutHeader
│   │   │   ├── index.jsx
│   │   │   └── index.less
│   │   └── LayoutSider
│   │       ├── index.jsx
│   │       └── index.less
│   ├── index.jsx                    # 主入口文件js
│   ├── pages                        # 页面层
│   │   ├── Chart
│   │   │   ├── index.jsx
│   │   │   └── index.less
│   │   ├── Home
│   │   │   ├── components           # 页面独立的组件层
│   │   │   │   └── menu.jsx
│   │   │   ├── index.jsx
│   │   │   └── index.less
│   │   └── Table
│   │       ├── index.jsx
│   │       └── index.less
│   ├── reducers                     # reducer层
│   │   ├── rootReducers.js
│   │   └── table.js
│   ├── request.jsx                  # 网络层
│   ├── routeConfig.jsx              # 路由层
│   └── servers                      # 接口层
│       └── table.js
├── utils                            # 工具类
├── webpack.base.conf.js             # webpack公共配置
├── webpack.dev.js                   # webpack开发
├── webpack.prod.js                  # webpack生产
</pre>

# 运行效果