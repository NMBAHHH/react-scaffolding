# 预览地址
# https://order.downfuture.com

# 特点
1. 不需要重复定义action，比如等待Action、成功Actoin、失败Action。写更少的action，完成更多的事。
```
export const GET_TABLE = 'GET_TABLE';
export function getTable(params) {
    return {
        type: GET_TABLE,
        payload: api.getTable(params)
    };
}
```
2. 自定义中间件，帮助Action完成异步操作。
```
function middleware({ dispatch }) {
    return next => action => {
        if(!action.isLoading) {
            return next(action);
        }
        if(isPromise(action.payload)) {
            if(action.isLoading) {
                dispatch({ ...action, payload: { isLoading: action.isLoading } });
            }
            return action.payload
                .then(result => {
                    dispatch({ ...action, payload: result});
                })
                .catch(error => {
                    dispatch({ ...action, payload: error, error: true});
                });
        }
        return next(action);
    };
}
```
3. 对reducer引入immutable，更简洁，持久化数据结构。
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
```
componentDidMount() {
        const { location: { pathname } } = this.props;
        this.setState({
            selectedKeys: [pathname],
            pathname
        });
    }

static getDerivedStateFromProps(props, state) {
    if(props.location.pathname != state.pathname) {
        return {
            pathname: props.location.pathname,
            selectedKeys: [props.location.pathname]
        };
    }
    return state;
}
```
5. 简单实现combineReducers，监听当前正在触发的action
```
const combineReducers = (reducers) => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce((nextState, key) => {
            nextState[key] = reducers[key](state[key], action);
            return nextState;
        }, { actionType: action.type });
    };
};
```
6. 按照16.8生命周期组件写法，完成对数据的判断
```
componentDidUpdate() {
    const { orderList, actionType } = this.props;
    const { orderListData } = orderList;
    // 获取表格信息成功
    if(!isEmpty(orderListData) && orderListData.code == 200 && actionType == 'getTable') {
        this.setState({
            orderListData
        });
    }

    // 获取表格信息失败
    if(!isEmpty(orderListData) && orderListData.code && orderListData.code != 200 && actionType == 'getTable') {
        message.error('获取表格信息失败');
    }

    this.props.actionType = '';
}

shouldComponentUpdate(nextProps, nextState) {
    // 浅层对比
    if(JSON.stringify(nextProps) == JSON.stringify(this.props) && JSON.stringify(nextState) == JSON.stringify(this.state)) {
        return false;
    }
    return true;
}
```

# 环境
```
npm ^6.5.0
node ^11.4.0
```
## 推荐使用vscode IDE
## 推荐安装以下插件
- Auto Close Tag
- Auto Rename Tag
- Beautify
- GitLens
- JavaScript (ES6) code snippets
- Path Autocomplete
- Path Intellisense
- React-Native/React/Redux snippets for es6/es7
- StandardJS - JavaScript Standard Style
- Vetur
- vscode wxml
- vscode-fileheader
- vscode-icons
- wxml
- ESLint
- Import Cost
- clear-console
- Beautify css/sass/scss/less
- clear-console
## vscode 用户自定义配置
```

{
    // 禁止vscode的默认制表符
    "editor.detectIndentation": false,
    // 制表符为4
    "editor.tabSize": 4,
    // 自动换行
    "editor.wordWrap": "on",
    // 字体大小
    "editor.fontSize": 16,
    // 选中糟糕的-
    "editor.wordSeparators": "./\\()\"':,.;<>~!@#$%^&*|+=[]{}`~?",
    // 启用后，将不会显示扩展程序建议的通知。
    "extensions.ignoreRecommendations": true,
    // 指定工作台中使用的颜色主题。
    "workbench.colorTheme": "Monokai",
    // 保存时格式化文件。 格式化程序必须可用，延迟后不得保存文件，并且编辑器不能关闭。
    "editor.formatOnSave": false,
    // 没有分阶段更改时提交所有更改。
    "git.enableSmartCommit": true,
    // 配置glob模式以排除文件和文件夹。 例如，文件资源管理器根据此设置决定显示或隐藏哪些文件和文件夹。 阅读更多关于glob模式的信息
    "files.exclude": {
        "**/.git": true,
        "**/.svn": true,
        "**/.hg": true,
        "**/CVS": true,
        "**/.DS_Store": true
    },
    "javascript.validate.enable" : false,
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "html",
        "typescriptreact",
        "typescript",
        {
          "language": "typescript",
          "autoFix": true
        },
        {
          "language": "typescriptreact",
          "autoFix": true
        },
        {
            "language": "html",
            "autoFix": true
        },
        {
            "language": "vue",
            "autoFix": true
        }
    ],
    "fileheader.Author": "Jiang",
    "fileheader.LastModifiedBy": "Jiang",
}
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
然后会在script目录下生成dist目录

# 目录结构
<pre>
.
├── LICENSE
├── README.md
├── package-lock.json
├── package.json
├── public
│   └── index.html
├── script                              # webpack
│   ├── webpack.base.conf.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── src                                 # 主入口
│   ├── actions                         # actions
│   │   └── orderList.js
│   ├── components                      # 公共组件层
│   │   ├── AsyncComponent
│   │   │   └── index.jsx
│   │   └── LayoutHeader
│   │       ├── index.jsx
│   │       └── index.less
│   ├── config.js                       # 基础配置s
│   ├── index.jsx                       # 入口js
│   ├── pages                           # 页面层
│   │   ├── AddGoods
│   │   │   ├── index.jsx
│   │   │   └── index.less
│   │   ├── Dashboard
│   │   │   ├── index.jsx
│   │   │   └── index.less
│   │   ├── Home
│   │   │   ├── components              # 页面独立组件
│   │   │   │   └── menu.jsx
│   │   │   ├── index.jsx
│   │   │   └── index.less
│   │   └── orderList
│   │       ├── component               # 页面独立组件
│   │       │   ├── orderListSearch.jsx
│   │       │   └── orderTable.jsx
│   │       ├── index.jsx
│   │       └── index.less
│   ├── reducers                        # reducer    
│   │   ├── orderList.js
│   │   └── rootReducers.js
│   ├── request.jsx                     # 网络请求
│   ├── routeConfig.jsx                 # 路由层
│   ├── servers                         # api层
│   │   └── table.js
│   └── utils                           # 工具类
│       └── index.js
├── .eslintrc                           # js语法检查
├── stylelint.config.js                 # css语法格式检查
├── yarn-error.log
└── yarn.lock
</pre>