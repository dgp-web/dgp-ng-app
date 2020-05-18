const DgpNgAppTools = require("../index");
const dgpNgAppTools = DgpNgAppTools({
    rootDirectory: process.cwd(),
    testsMatcher: "/node_modules/dgp-ng-app-tools/bin/karma-tests.js"
});

module.exports = function (config) {

    const karmaConfig = dgpNgAppTools.createKarmaConfig(config);

    config.set({
        ...karmaConfig
    });
};
