const path = require('path');
const webpackBase = require('./webpack.base.conf');

const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasureWebpackPlugin();

const config = {
    optimization: webpackBase.optimization,
    // 配置源码显示方式
    mode: 'production',
    entry: {
        app: ['./src/index.jsx']
    },
    output: {
        filename: '[name].[hash].js',
        hashDigestLength: 7,
        path: path.resolve(__dirname, 'dist'),
        publicPath: './'
    },
    resolve: webpackBase.resolve,
    module: webpackBase.module,
    plugins: [
        webpackBase.plugins.cleanWebpack,
        webpackBase.plugins.html,
        webpackBase.plugins.miniCssExtract,
        webpackBase.plugins.optimizeCssAssets,
        webpackBase.plugins.progressBarPlugin
    ],
    externals: webpackBase.externals
};

module.exports = smp.wrap(config);
