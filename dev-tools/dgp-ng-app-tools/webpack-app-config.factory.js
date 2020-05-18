const path = require('path');
const webpackMerge = require('webpack-merge');

const sharedConfigFactory = require("../dgp-app-tools/webpack-shared-config.factory");

/**
 * Factory for a tsconfig file
 *
 * @param env {{distDirectory: string, rootDirectory: string, tsconfigFile: string}}
 */
module.exports = function (env) {

    return webpackMerge(sharedConfigFactory(env), {

        entry: {
            'main-client': path.join(env.rootDirectory + '/src/main.ts')
        }

    });

};
