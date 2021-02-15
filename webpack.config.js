const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';
const webpackTarget = isDevelopment ? 'web' : 'browserslist';
const finalCSSLoader = isDevelopment ?  'style-loader' : MiniCssExtractPlugin.loader;
const devServerConf = {
    port: 5000
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: process.env.NODE_ENV,
    entry: {
        main: './index.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    target: webpackTarget,
    devServer: {
        port: devServerConf.port,
        hot: true,
        host: '0.0.0.0',
        openPage: `http://localhost:${devServerConf.port}`
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'assets/img',
                    to: path.resolve(__dirname, 'dist/img')
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [finalCSSLoader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/i,
                use: [finalCSSLoader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.js$/i,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: ['babel-loader']
            },
            {
                test: /\.(?:ico|png|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    }
}