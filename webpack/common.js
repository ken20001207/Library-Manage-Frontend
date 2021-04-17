const {resolve} = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        plugins: [new TsconfigPathsPlugin()],
    },
    context: resolve(__dirname, '../'),
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(tsx|ts)$/,
                include: [resolve('src')],
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                    failOnError: true,
                },
            },
            {
                test: /\.js$/,
                use: ['babel-loader', 'source-map-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'awesome-typescript-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {importLoaders: 1}
                }],
            },
            {
                test: /\.(scss|sass)$/,
                loaders: [
                    'style-loader',
                    {loader: 'css-loader', options: {importLoaders: 1}},
                    'sass-loader',
                ],
            },
            {
                test: /\.less$/,
                loaders: [
                    'style-loader',
                    {loader: 'css-loader', options: {importLoaders: 1}},
                    {
                        loader: 'less-loader',
                        options: {lessOptions: {javascriptEnabled: true}}
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
                ],
            },
        ],
    },
    plugins: [
        new CheckerPlugin(),
        new CopyPlugin({patterns: [{from: './public', to: './'}]}),
        new HtmlWebpackPlugin({template: 'index.html'}),
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    performance: {hints: false},
};
