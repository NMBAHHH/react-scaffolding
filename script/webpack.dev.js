const webpackBase = require('./webpack.base.conf');
const path = require('path');

module.exports = {
    // 配置源码显示方式
    devtool: 'eval-source-map',
    mode: 'development',
    entry: {
        app: ['./src/index.jsx'],
    },
    resolve: webpackBase.resolve,
    module: webpackBase.module,
    optimization: webpackBase.optimization,
    plugins: [
        webpackBase.plugins.html,
        webpackBase.plugins.miniCssExtract,
        webpackBase.plugins.optimizeCssAssets,
    ],
    // devServer: webpackBase.devServer,
    externals: webpackBase.externals
};
