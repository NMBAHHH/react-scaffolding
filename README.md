# 目录结构描述
<pre>
.
├── public                  // 公共页面
│   └── index.html
├── src                     // 主入口
│   ├── actions             // actions文件夹
│   │   └── HomeAction.js
│   ├── components          // 页面共享组件层
│   ├── index.jsx           // 入口文件
│   ├── pages               // 页面层
│   │   ├── About
│   │   │   ├── index.jsx
│   │   │   └── index.less
│   │   └── Home
│   │       ├── index.jsx
│   │       └── index.less
│   ├── public              // 公共样式层
│   ├── reducers            // reducer层
│   │   ├── Home
│   │   │   └── index.js
│   │   └── index.js
│   ├── request.jsx         // 网络层
│   ├── router.jsx          // 路由层
│   ├── servers             // 接口层
│   │   └── home.jsx
│   └── utils               // 工具类
├── webpack.base.conf.js    // webpack公共层
├── webpack.dev.js          // webpack开发
├── webpack.prod.js         // webpack生产
</pre>

# 解决问题

1、不需要重复定义action，比如等待Action、成功Actoin、失败Action。写更少的action
2、reducer纯函数式管理，更简洁。
3、只需定义一个标准的FSA，不用关心异步处理。
4、路由完全匹配导航，包含url输入，js跳转。