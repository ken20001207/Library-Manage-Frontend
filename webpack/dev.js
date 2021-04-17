const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./common');
const path = require('path');

module.exports = merge(commonConfig, {
    mode: 'development',
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index.tsx',
    ],
    devServer: {
        hot: true,
        historyApiFallback: true,
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [new webpack.HotModuleReplacementPlugin()],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
});
