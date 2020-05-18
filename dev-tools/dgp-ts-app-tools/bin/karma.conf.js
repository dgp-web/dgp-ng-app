const DgpTsAppTools = require("../index");
const dgpTsAppTools = DgpTsAppTools({
    rootDirectory: process.cwd(),
    testsMatcher: "/node_modules/dgp-ts-app-tools/bin/karma-tests.js"
});

module.exports = function (config) {

    const karmaConfig = dgpTsAppTools.createKarmaConfig(config);

    config.set({
        ...karmaConfig
    });
};
