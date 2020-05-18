const path = require("path");
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const DgpNgAppTools = require("../index");
const dgpNgAppTools = DgpNgAppTools({
    rootDirectory: process.cwd()
});

module.exports = function (env) {

    return dgpNgAppTools.createWebpackAppConfig({
        ...env,
        development: env.development,
        angularCompilerPlugin: new AngularCompilerPlugin({
            tsConfigPath: path.join(process.cwd(), 'tsconfig.app.json'),
            entryModule: path.resolve(process.cwd()) + '/src/app/app.module#AppModule',
            sourceMap: false,
        })
    });

};
