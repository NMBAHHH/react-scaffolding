const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

module.exports = {
    optimization: {
        minimizer: [
            // 压缩js
            new TerserPlugin({
                test: /(\.jsx|\.js)$/,
                extractComments: true,
                parallel: true,
                cache: true
            }),
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less'],
        // alias: {
        //     // 'react': path.resolve(__dirname,'dummyReact.js')
        //     'react': 'dummyReact.js'
        // }
    },
    // 缓存文件
    vendor: [
        'react',
        'react-dom',
        'redux',
        'react-router-dom',
        'react-router-redux',
        'react-redux',
        'history',
        'antd',
        'dayjs'
    ],
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')]
                        }
                    }
                ],
                include: /(node_modules)/
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            }
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            paths: [
                                path.resolve(__dirname, 'node_modules')
                            ],
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')]
                        }
                    }
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
    plugins: {
        // 配置入口页面
        html: new HtmlWebpackPlugin({
            title: 'adjustClient',
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
        }),
        // 每次打包前，先清理dist包
        cleanWebpack: new CleanWebpackPlugin(['dist']),
        // 抽取css
        miniCssExtract: new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].css',
            ignoreOrder: true
        }),
        namedModules: new webpack.NamedModulesPlugin(),
        optimizeCssAssets: new OptimizeCssAssetsPlugin(),
        // 生成包依赖图
        bundleAnalyzer: new BundleAnalyzerPlugin({ analyzerPort: 8081 })
    },
    devServer: {
        hot: false,
        historyApiFallback: true,
        contentBase: './',
        compress: true
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'React',
            commonjs: 'React',
            amd: 'React'
        },
        redux: {
            root: 'redux',
            commonjs2: 'redux',
            commonjs: 'redux',
            amd: 'redux'
        },
        'react-router-dom': {
            root: 'ReactRouterDom',
            commonjs2: 'ReactRouterDom',
            commonjs: 'ReactRouterDom',
            amd: 'ReactRouterDom'
        },
        'react-router-redux': {
            root: 'ReactRouterRedux',
            commonjs2: 'ReactRouterRedux',
            commonjs: 'ReactRouterRedux',
            amd: 'ReactRouterRedux'
        },
        'react-redux': {
            root: 'ReactRedux',
            commonjs2: 'ReactRedux',
            commonjs: 'ReactRedux',
            amd: 'ReactRedux'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'ReactDOM',
            commonjs: 'ReactDOM',
            amd: 'ReactDOM'
        },
        history: 'history',
        dayjs: 'dayjs'
    }
};