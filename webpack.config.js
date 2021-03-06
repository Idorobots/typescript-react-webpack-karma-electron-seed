'use strict';

const path = require('path');
const webpack = require('webpack');
const SplitByPathPlugin = require('webpack-split-by-path');
const TypedocPlugin = require('typedoc-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PostCssImport = require('postcss-import');
const PostCssNext = require('postcss-cssnext');
const CssNano = require('cssnano');

const plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new TypedocPlugin({
        externalPattern: '**/*.spec.ts*',
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
    new ExtractTextPlugin("style.css", {
        allChunks: true,
    }),
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
    {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: /node_modules/,
    },
];

const customTypedCssLoader = path.resolve(__dirname, 'util/css-types-loader');

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
        loader: ExtractTextPlugin.extract('style-loader',
                                          'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]&sourceMap!' + customTypedCssLoader + '!postcss-loader'),
        exclude: /node_modules/,
    },
    {
        test: /\.json$/,
        loader: 'json',
    },
].concat([/\.svg$/, /\.eot$/, /\.woff2?$/, /\.ttf$/].map((pattern) => ({
    test: pattern,
    loader: 'url',
    exclude: /node_modules/,
})));

const postcss = (webpack) => [
    PostCssImport({
        addDependencyTo: webpack,
    }),
    PostCssNext,
    CssNano({
        safe: true,
        sourcemap: true,
        autoprefixer: false,
    }),
];

module.exports = {
    verbose: true,
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
            '.json',
        ],
    },
    plugins: plugins,
    module: {
        preLoaders: preLoaders,
        loaders: loaders,
    },
    postcss: postcss,
};
