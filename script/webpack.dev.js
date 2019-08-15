const webpackBase = require('./webpack.base.conf');

module.exports = {
    optimization: webpackBase.optimization,
    // 配置源码显示方式
    devtool: 'eval-source-map',
    mode: 'development',
    entry: {
        app: ['./src/index.jsx']
    },
    resolve: webpackBase.resolve,
    module: webpackBase.module,
    plugins: [
        webpackBase.plugins.html,
        webpackBase.plugins.miniCssExtract,
        webpackBase.plugins.optimizeCssAssets,
        webpackBase.plugins.bundleAnalyzer,
        webpackBase.plugins.progressBarPlugin
    ],
    // devServer: webpackBase.devServer,
    externals: webpackBase.externals
};
