const merge = require('webpack-merge');
const {resolve} = require('path');

const commonConfig = require('./common');
const webpack = require('webpack');

module.exports = merge(commonConfig, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    entry: './src/index.tsx',
    output: {
        filename: 'js/bundle.[hash].min.js',
        path: resolve(__dirname, '../build'),
    },
    optimization: {minimize: true},
    plugins: [
        new webpack.DefinePlugin({
            'process.env':
                {NODE_ENV: JSON.stringify('production')}
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
    ],
});
