const path = require("path");
const DgpNgAppTools = require("../index");

module.exports = function (env) {

    const dgpNgAppTools = DgpNgAppTools({
        rootDirectory: path.join(process.cwd(), env.projectPath),
        tsconfigFile: "tsconfig.app.json",
        distDirectory: "dist/dgp-labs"
    });

    return dgpNgAppTools.createWebpackAppConfig({
        ...env,
        development: true
    });

};
