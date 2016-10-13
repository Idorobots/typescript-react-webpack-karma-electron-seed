'use strict';

var path = require('path');
const webpack = require('webpack');
const SplitByPathPlugin = require('webpack-split-by-path');
const TypedocPlugin = require('typedoc-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const plugins = [
    new TypedocPlugin({
        externalPattern: '**/*.spec.ts',
        excludeExternals: true,
        jsx: 'react',
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.SourceMapDevToolPlugin({
        filename: null,
        test: /\.ts$/,
    }),
    new CopyWebpackPlugin([
        { from: 'src/assets', to: 'assets' },
        { from: 'src/app.js', to: '.' },
    ]),
    new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body',
    }),
    new SplitByPathPlugin([{
        name: 'vendor',
        path: [path.join(__dirname, 'node_modules/')]
    }]),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: true,
        },
    }),
];

const preLoaders = [
    {
        test: /\.tsx?$/,
        loader: 'tslint',
        exclude: /node_modules/,
    },
];

const loaders = [
    {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
    },
    {
        test: /\.html$/,
        loader: 'raw',
        exclude: /node_modules/,
    },
    {
        test: /\.css$/,
        loader: 'style-loader!css?-minimize!postcss',
        exclude: /node_modules/,
    },
    {
        test: /\.json$/,
        loader: 'json',
    }].concat([/\.svg$/, /\.eot$/, /\.woff2?$/, /\.ttf$/].map((pattern) => ({
        test: pattern,
        loader: 'url',
        exclude: /node_modules/,
    })));

const postcss = [
    require('postcss-modules-local-by-default'),
    require('postcss-import')({
        addDependencyTo: webpack,
    }),
    require('postcss-cssnext'),
    require('cssnano')({
        safe: true,
        sourcemap: true,
        autoprefixer: false,
    }),
];

module.exports = {
    entry: './src/main.ts',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },

    devtool: 'source-map',

    resolve: {
        extensions: [
            '',
            '.ts',
            '.tsx',
            '.js',
            '.json'
        ],
    },

    plugins: plugins,

    module: {
        preLoaders: preLoaders,
        loaders: loaders,
    },

    postcss: () => postcss
};
