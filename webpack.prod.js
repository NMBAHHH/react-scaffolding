const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackBase = require('./webpack.base.conf');

module.exports = {
    devtool: 'hidden-source-map',
    mode: 'production',
    entry: ['./src/index.jsx'],
    output: {
        filename: '[name].[hash].js',
        hashDigestLength: 7,
        path: path.resolve(__dirname, 'dist'),
        publicPath: './',
    },
    // resolve: {
    //     extensions: ['.js', '.jsx', '.css', '.less'],
    // },
    resolve: webpackBase.resolve,
    // module: {
    //     rules: [
    //         {
    //             test: /\.js|jsx$/,
    //             exclude: /(node_modules)/,
    //             loader: 'babel-loader',
    //         },
    //         {
    //             test: /\.css$/,
    //             use: [
    //                 MiniCssExtractPlugin.loader,
    //                 'css-loader',
    //             ],
    //         },
    //         {
    //             test: /\.less$/,
    //             use: [
    //                 'style-loader',
    //                 {
    //                     loader: 'css-loader',
    //                     options: {
    //                         importLoaders: 1,
    //                     },
    //                 },
    //                 'less-loader',
    //             ],
    //         },
    //         {
    //             test: /\.(png|svg|jpg|gif|jpeg)$/,
    //             use: [
    //                 'file-loader',
    //             ],
    //         },
    //         {
    //             test: /\.(woff|woff2|eot|ttf|otf)$/,
    //             use: [
    //                 'file-loader',
    //             ],
    //         },
    //     ],
    // },
    module: webpackBase.module,
    plugins: [
        new CleanWebpackPlugin(['dist']),
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
        // webpackBase.HtmlWebpackPlugin,
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].css',
        }),
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
