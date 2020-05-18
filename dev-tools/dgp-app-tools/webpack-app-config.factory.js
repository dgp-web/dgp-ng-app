const webpackMerge = require('webpack-merge');

const sharedConfigFactory = require("./webpack-shared-config.factory");

/**
 * Factory for a tsconfig file
 *
 * @param env {{development: boolean, distDirectory: string, rootDirectory: string, tsconfigFile: string}}
 */
module.exports = function (env) {

    return webpackMerge(sharedConfigFactory(env), {

        entry: {
            'main-client': env.rootDirectory + '/src/main.ts',
            'main-playground': env.rootDirectory + '/src/main.playground.ts'
        }

    });

};
