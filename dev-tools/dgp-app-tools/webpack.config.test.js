const webpackMerge = require('webpack-merge');
const webpackSharedConfigFactory = require("./webpack-shared-config.factory");

/**
 * Factory for a tsconfig file for specs
 *
 * @param env {{development: boolean, distDirectory: string, rootDirectory: string, tsconfigFile: string}}
 * @returns {*|{}}
 */
module.exports = function (env) {

    return webpackMerge(webpackSharedConfigFactory(env), {
        mode: "development"
    });

};