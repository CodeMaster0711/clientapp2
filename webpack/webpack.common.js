const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const utils = require('./utils.js');
module.exports = options => ({
    cache: options.env !== 'production',
    resolve: {
        extensions: [
            '.js', '.jsx', '.ts', '.tsx', '.json'
        ],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
                loaders: ['file-loader?hash=sha512&digest=hex&name=[hash].[ext]']
            },
            {
                enforce: 'pre',
                test: /\.jsx?$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                loaders: 'tslint-loader',
                exclude: ['node_modules']
            }
        ]
    },
    stats: {
        children: false
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(options.env),
                version: JSON.stringify(utils.parseVersion())
            }
        }),
        /*new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          chunks: ['main'],
          minChunks: module => utils.isExternalLib(module)
        }),
        new webpack.optimize.CommonsChunkPlugin({
          name: ['manifest'],
          minChunks: Infinity
        }),*/
        new CopyWebpackPlugin([
            {
                from: './src/main/webapp/swagger-ui/',
                to: 'swagger-ui'
            }, {
                from: './node_modules/swagger-ui/dist/css',
                to: 'swagger-ui/dist/css'
            }, {
                from: './node_modules/swagger-ui/dist/lib',
                to: 'swagger-ui/dist/lib'
            }, {
                from: './node_modules/swagger-ui/dist/swagger-ui.min.js',
                to: 'swagger-ui/dist/swagger-ui.min.js'
            }, {
                from: './src/main/webapp/app/img',
                to: 'img'
            }, {
                from: './src/main/webapp/robots.txt',
                to: 'robots.txt'
            }
        ]),
        new HtmlWebpackPlugin({
            template: './src/main/webapp/index.html',
            chunksSortMode: 'dependency',
            inject: 'body',
            excludeChunks: ['search', 'shopify_search_admin', 'search_results']
        }),
        new HtmlWebpackPlugin({
            template: './src/main/webapp/auto-suggest.html',
            chunksSortMode: 'dependency',
            inject: 'body',
            filename: 'suggest/index.html',
            excludeChunks: ['main', 'shopify_search_admin', 'search_results']
        }),
        new HtmlWebpackPlugin({
            template: './src/main/webapp/search-results.html',
            chunksSortMode: 'dependency',
            inject: 'body',
            filename: 'search/index.html',
            excludeChunks: ['main', 'shopify_search_admin', 'search']
        }),
        new HtmlWebpackPlugin({
            template: './src/main/webapp/shopify-search-admin.html',
            chunksSortMode: 'dependency',
            inject: 'body',
            filename: 'shopify-search-admin/index.html',
            excludeChunks: ['main', 'search', 'search_results']
        })
    ]
});
