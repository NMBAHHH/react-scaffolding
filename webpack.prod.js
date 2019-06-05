const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackBase = require('./webpack.base.conf');

module.exports = {
    // 配置源码显示方式
    devtool: 'hidden-source-map',
    mode: 'production',
    entry: ['./src/index.jsx'],
    output: {
        filename: '[name].[hash].js',
        hashDigestLength: 7,
        path: path.resolve(__dirname, 'dist'),
        publicPath: './',
    },
    resolve: webpackBase.resolve,
    module: webpackBase.module,
    plugins: [
        // 每次打包前，先清理dist包
        new CleanWebpackPlugin(['dist']),
        // 配置入口页面
        new HtmlWebpackPlugin({
            title: 'sight',
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
        // 压缩css
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].css',
        }),
        // 压缩js
        new UglifyJSPlugin({
            test: /(\.jsx|\.js)$/,
            extractComments: true,
            parallel: true,
            cache: true,
        }),
    ],
    devServer: webpackBase.devServer,
    externals: webpackBase.externals
};
