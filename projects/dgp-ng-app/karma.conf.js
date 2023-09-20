process.env.CHROME_BIN = require("puppeteer").executablePath();
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine", "@angular-devkit/build-angular"],
        plugins: [
            require("karma-jasmine"),
            require("karma-chrome-launcher"),
            require("karma-spec-reporter"),
            require("karma-coverage"),
            require("@angular-devkit/build-angular/plugins/karma"),
        ],
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
        },
        coverageReporter: {
            dir: require('path').join(__dirname, '../../dist/coverage/dgp-ng-app'),
            subdir: '.',
            reporters: [
                {type: 'html'},
                {type: 'text-summary'},
                {type: 'cobertura'}
            ],
            check: {
                global: {
                    statements: 60,
                    branches: 32,
                    functions: 48,
                    lines: 62
                }
            },
            watermarks: {
                statements: [63, 64],
                branches: [37, 38],
                functions: [50, 51],
                lines: [64, 65]
            }
        },
        reporters: ["spec"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["ChromeHeadless"],
        singleRun: false,
        restartOnFileChange: true,
        specReporter: {
            maxLogLines: 5,
            suppressErrorSummary: false,
            suppressFailed: false,
            suppressPassed: true,
            suppressSkipped: true,
            showSpecTiming: false,
            failFast: false
        }
    });
};
