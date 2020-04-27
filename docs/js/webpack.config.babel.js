
import { resolve } from 'path'
import webpack from 'webpack'

import ManifestPlugin from 'webpack-manifest-plugin'
import { isProd } from './src/config'

const WDS_PORT = 7000

export default {
    mode: process.env.NODE_ENV,
    devtool: isProd ? false : 'source-map',
    performance: {
        hints: false,
    },
    entry: [
        'react-hot-loader/patch',
        './src',
    ],
    output: {
        filename: isProd ? '[hash].[name].js' : '[name].js',
        path: resolve(__dirname, '../server/dist'),
        publicPath: isProd ? '/dist/' : `http://localhost:${WDS_PORT}/dist/`,
        globalObject: 'window',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: {
                    test: resolve(__dirname, 'node_modules'),
                    exclude: resolve(__dirname, 'node_modules/@dashboard'),
                },
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader', // compiles Sass to CSS, using Node Sass by default
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    devServer: {
        contentBase: '/',
        publicPath: isProd ? '/dist/' : `http://localhost:${WDS_PORT}/dist/`,
        hot: true,
        port: WDS_PORT,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        disableHostCheck: true,
        progress: true,
    },
    resolve: {
        extensions: [
            isProd ? '.prod.jsx' : '.dev.jsx',
            isProd ? '.prod.js' : '.dev.js',
            '.jsx', '.js',
        ],
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ManifestPlugin({
            writeToFileEmit: true,
        }),
    ],
}
