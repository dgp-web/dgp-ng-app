process.env.CHROME_BIN = require("puppeteer").executablePath();

import { createTestsMatcher } from "./karma-tests";
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {

    const projectPath = config.projectPath;
    const distPath = config.distPath;
    const tsconfigFile = config.tsconfigFile;
    const testsMatcher = createTestsMatcher(projectPath) as any;

    config.set({
        basePath: "",
        frameworks: ["jasmine"],
        files: [
            // config.rootDirectory + "/vendorTest.js",
            testsMatcher
        ],
        plugins: [
            require("karma-spec-reporter"),
            require("karma-jasmine"),
            require("karma-webpack"),
            require("karma-chrome-launcher")
        ],
        preprocessors: {
            [testsMatcher]: ["webpack"]
        },
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
        },
        reporters: ["spec"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["ChromeHeadless"],
        mime: {"application/javascript": ["ts", "tsx"]},
        singleRun: false,
        restartOnFileChange: true,
        webpack: require("./webpack.config")({
            tsconfigFile,
            distPath,
            projectPath
        }),
        webpackMiddleware: {stats: "errors-only"},
        specReporter: {
            maxLogLines: 5,
            suppressErrorSummary: false,
            suppressFailed: false,
            suppressPassed: true,
            suppressSkipped: true,
            showSpecTiming: false,
            failFast: false
        },
    });
};
