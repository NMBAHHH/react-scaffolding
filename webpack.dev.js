const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackBase = require('./webpack.base.conf');

module.exports = {
    // 配置源码显示方式
    devtool: 'source-map',
    mode: 'development',
    entry: ['./src/index.jsx', 'whatwg-fetch'],
    resolve: webpackBase.resolve,
    module: webpackBase.module,
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             vendor: {
    //                 test: /node_modules/,
    //                 chunks: 'initial',
    //                 name: 'common/vendor',
    //                 priority: 10,
    //             },
    //             utils: {
    //                 test: /\.js$/,
    //                 chunks: 'initial',
    //                 name: 'common/utils',
    //                 minSize: 0,
    //             },
    //         },
    //     },
    // },
    plugins: [
        // 配置入口页面
        new HtmlWebpackPlugin({
            title: 'react-scaffolding',
            template: 'public/index.html',
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }),
        // webpackBase.HtmlWebpackPlugin,
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin()
    ],
    devServer: webpackBase.devServer,
    externals: webpackBase.externals
};
