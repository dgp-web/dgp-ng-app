process.env.CHROME_BIN = require("puppeteer").executablePath();

import { createTestsMatcher } from "./karma-tests";
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {

    const projectPath = config.distPath;
    const distPath = config.projectPath;

    config.set({
        basePath: "",
        frameworks: ["jasmine"],
        files: [
            config.rootDirectory + "/vendorTest.js",
            createTestsMatcher(projectPath)
        ],
        plugins: [
            require("karma-spec-reporter"),
            require("karma-jasmine"),
            require("karma-chrome-launcher"),
            require("@angular-devkit/build-angular/plugins/karma"),
        ],
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
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
        },
    });
};
