const path = require('path');
const webpack = require('webpack');
const webpackBase = require('./webpack.base.conf');

module.exports = {
    // 配置源码显示方式
    // devtool: 'cheap-source-map',
    mode: 'production',
    entry: {
        app: ['./src/index.jsx'],
        vendor: webpackBase.vendor,
    },
    output: {
        filename: '[name].[hash].js',
        hashDigestLength: 7,
        path: path.resolve(__dirname, 'dist'),
        publicPath: './',
        // library: '[name]_[chunkhash]'
    },
    resolve: webpackBase.resolve,
    module: webpackBase.module,
    optimization: webpackBase.optimization,
    plugins: [
        webpackBase.plugins.cleanWebpack,
        webpackBase.plugins.html,
        webpackBase.plugins.miniCssExtract,
        webpackBase.plugins.optimizeCssAssets,
    ],
    devServer: webpackBase.devServer,
    // externals: webpackBase.externals
};
