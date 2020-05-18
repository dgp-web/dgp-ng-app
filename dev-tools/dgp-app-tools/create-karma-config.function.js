process.env.CHROME_BIN = require('puppeteer').executablePath();
const path = require('path');

module.exports = function (config) {

    const isDevBuild = config.development === true;
    const rootDirectory = config.rootDirectory;
    const distDirectory = config.distDirectory;
    const tsconfigFile = config.tsconfigFile;
    const testsMatcher = config.testsMatcher;

    return {
        basePath: '.',
        frameworks: [
            'jasmine'
        ],
        files: isDevBuild ? [
            rootDirectory + "/" + distDirectory + '/vendor.js',
            testsMatcher
        ] : [
            testsMatcher
        ],
        plugins: [
            require('karma-jasmine'),
            require('karma-webpack'),
            require('karma-chrome-launcher'),
            require('karma-mocha-reporter'),
        ],
        preprocessors: {
            [testsMatcher]: ['webpack']
        },
        reporters: [
            'mocha'
        ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: isDevBuild,
        browsers: [
            'ChromeHeadless'
        ],

        mime: {'application/javascript': ['ts', 'tsx']},
        singleRun: !isDevBuild,
        webpack: require("./webpack.config.test.js")({
            tsconfigFile: tsconfigFile,
            rootDirectory: rootDirectory,
            distDirectory: distDirectory,
            development: isDevBuild
        }),
        webpackMiddleware: {stats: 'errors-only'},
        mochaReporter: {
            output: 'minimal',
            maxLogLines: '5'
        }

    };
};
