const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const theme = require('./../src/css/antd.less');

const path = require('path');
function resolve(dir) {
    return path.join(__dirname, '.', dir);
}

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less'],
        alias:{
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: theme,
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    HtmlWebpackPlugin: [
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
            minifyURLs: true
        })
    ],
    devServer: {
        hot: false,
        historyApiFallback: true,
        // contentBase: path.resolve(__dirname,'src/index.js'),
        compress: true
    },
    externals: {
        // 'antd': 'antd'
    }
};