'use strict';

const webpack = require('./webpack.config');

module.exports = (config) => {
    const coverage = config.singleRun ? ['coverage'] : [];

    config.set({
        basePath: '',

        frameworks: [
            'jasmine',
        ],

        plugins: [
            'karma-jasmine',
            'karma-sourcemap-writer',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-coverage',
            'karma-remap-istanbul',
            'karma-spec-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-electron',
        ],

        files: [
            './node_modules/es6-shim//es6-shim.js',
            {
                pattern: './src/**/*.spec.ts',
                served: true,
                included: true,
                watched: true,
            },
            {
                pattern: '**/*.map',
                served: true,
                included: false,
                watched: true,
            },
        ],

        preprocessors: {
            './src/**/*.spec.ts': ['webpack', 'sourcemap'],
        },

        webpack: Object.assign({}, webpack, {
            output: null,
            devtool: 'inline-source-map',
            verbose: false,
            module: {
                loaders: webpack.module.loaders,
                postLoaders: config.singleRun
                    ? [
                        {
                            test: /^(.(?!\.spec))*\.tsx$/,
                            loader: 'istanbul-instrumenter-loader',
                            query: {
                                embedSource: true,
                            },
                        }
                    ]
                : [],
            },
            stats: {
                colors: true,
                reasons: true,
            },
            plugins: [],
            debug: true,
        }),

        reporters: ['spec']
            .concat(coverage)
            .concat(coverage.length > 0 ? ['karma-remap-istanbul'] : []),

        remapIstanbulReporter: {
            src: [
                './dist/coverage/phantomjs/coverage-final.json',
                './dist/coverage/chrome/coverage-final.json',
                './dist/coverage/electron/coverage-final.json',
                './dist/coverage/firefox/coverage-final.json',
            ],
            reports: {
                html: './dist/coverage',
            },
            timeoutNotCreated: 2000,
            timeoutNoMoreFiles: 2000,
        },

        coverageReporter: {
            type: 'json',
            dir: './dist/coverage/',
            subdir: (browser) => {
                return browser.toLowerCase().split(/[ /-]/)[0];
            }
        },

        port: 9876,

        colors: true,

        logLevel: config.LOG_DEBUG,

        autoWatch: true,

        browsers: ['Chrome', 'Electron', 'Firefox', 'PhantomJS'],
    });
};
