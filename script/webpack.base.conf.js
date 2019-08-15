const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
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
            })
        ],
        splitChunks: {
            cacheGroups: {
                vendors: {
                    //node_modules里的代码
                    test:/[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    name:'vendors', //chunks name
                    priority:10, //优先级
                    enforce:true
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less', '.json']
    },
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
                    // 'style-loader',
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')]
                        }
                    }
                    // 'style-loader'
                ],
                include: /(node_modules)/
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            }
                        }
                    },
                    // 'style-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            paths: [
                                path.resolve(__dirname, 'node_modules')
                            ]
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
            minifyURLs: true
        }),
        // 清理dist包
        cleanWebpack: new CleanWebpackPlugin(['dist']),
        // 抽取css
        miniCssExtract: new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[name].[hash].css',
            ignoreOrder: false
        }),
        namedModules: new webpack.NamedModulesPlugin(),
        // 压缩css
        optimizeCssAssets: new OptimizeCssAssetsPlugin(),
        // 生成包依赖图
        bundleAnalyzer: new BundleAnalyzerPlugin({ analyzerPort: 8081 }),
        // 打包进度
        progressBarPlugin: new ProgressBarPlugin()
    },
    devServer: {
        hot: false,
        historyApiFallback: true,
        contentBase: './',
        compress: true
    },
    // 抽离第三方库
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        redux: 'Redux',
        g2: 'G2',
        'g2-react': 'G2',
        'immutable': 'Immutable',
        'moment': 'moment'
    }
};