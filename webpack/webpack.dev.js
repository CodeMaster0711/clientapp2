const webpack = require('webpack');
const writeFilePlugin = require('write-file-webpack-plugin');
const webpackMerge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'development';
const extractCSS = new ExtractTextPlugin(`[name].[hash].css`);
const extractSASS = new ExtractTextPlugin(`[name]-sass.[hash].css`);

module.exports = webpackMerge(commonConfig({env: ENV}), {
    devtool: 'eval-source-map',
    entry: {
        main: ['react-hot-loader/patch', './src/main/webapp/app/index'],
        search: ['react-hot-loader/patch', './src/main/webapp/app/search-main.tsx'],
        search_results: ['react-hot-loader/patch', './src/main/webapp/app/Search/index.tsx'],
        shopify_search_admin: ['react-hot-loader/patch', './src/main/webapp/app/shopify-search-admin.tsx']
    },
    output: {
        path: utils.root('target/www'),
        filename: 'app/[name].bundle.js',
        chunkFilename: 'app/[id].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'react-hot-loader/webpack',
                },
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            useCache: true
                        }
                    }],
                include: [utils.root('./src/main/webapp/app')],
                exclude: ['node_modules']
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        stats: {
            children: false
        },
        hot: true,
        contentBase: './target/www',
        proxy: [
            {
                context: [
                    '/api', '/management', '/swagger-resources', '/v2/api-docs', '/h2-console'
                ],
                target: 'http://127.0.0.1:8080',
                secure: false
            }, {
                context: ['/websocket'],
                target: 'ws://127.0.0.1:8080',
                ws: true
            }
        ]
    },
    plugins: [
        /*new BrowserSyncPlugin({
          host: 'localhost',
          port: 8000,
          proxy: {
            target: 'http://localhost:9060',
            ws: true
          }
        }, {
          reload: false
        }),*/
        extractCSS,
        extractSASS,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new writeFilePlugin(),
        new webpack.WatchIgnorePlugin([
            utils.root('src/test'),
        ]),
        new WebpackNotifierPlugin({
            title: 'JHipster',
            contentImage: path.join(__dirname, 'logo-jhipster.png')
        })
    ]
});
