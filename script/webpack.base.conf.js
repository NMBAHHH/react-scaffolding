const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    optimization: {
        minimizer: [
            // 压缩js
            new TerserPlugin({
                test: /\.(jsx|js)$/,
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
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
            {
                test: /\.(css|less)$/,
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
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.less$/,
                include: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: {
                                'primary-color': 'red'
                            },
                            javascriptEnabled: true
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
        // 清理dist包
        cleanWebpack: new CleanWebpackPlugin(['dist']),
        // 抽取css
        miniCssExtract: new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].css',
            ignoreOrder: false
        }),
        namedModules: new webpack.NamedModulesPlugin(),
        // 压缩css
        optimizeCssAssets: new OptimizeCssAssetsPlugin(),
        // 生成包依赖图
        bundleAnalyzer: new BundleAnalyzerPlugin({ analyzerPort: 8081 }),
        // 打包进度
        progressBarPlugin: new ProgressBarPlugin(),
        // 加载中文包
        ContextReplacementPlugin: new webpack.ContextReplacementPlugin(
            /moment\/locale$/,
            /zh-cn/
        )
    },
    devServer: {
        hot: false,
        historyApiFallback: true,
        contentBase: './',
        compress: true
    },
    // externals 排除对应的包，注：排除掉的包必须要用script标签引入下
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        redux: 'Redux',
        g2: 'G2',
        'g2-react': 'G2',
        'immutable': 'Immutable',
        // 'moment': 'moment',
        // '../moment': 'moment',
        'socket.io-client': 'io'
    }
};