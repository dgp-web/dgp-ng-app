const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;

const sharedConfigFactory = require("../dgp-app-tools/webpack-shared-config.factory");

/**
 * Factory for a tsconfig file
 *
 * @param env {{development: boolean, distDirectory: string, rootDirectory: string, tsconfigFile: string, angularCompilerPlugin: AngularCompilerPlugin, includePlayground?: boolean}}
 */
module.exports = function (env) {

    const isDevBuild = (env !== null && env !== undefined) && env.development === true;

    const combinedDevConfig = env.includePlayground ? webpackMerge(sharedConfigFactory(env), {

        entry: {
            'main-client': env.rootDirectory + '/src/main.ts',
            'main-playground': env.rootDirectory + '/src/main.playground.ts'
        }

    }) : webpackMerge(sharedConfigFactory(env), {

        entry: {
            'main-client': env.rootDirectory + '/src/main.ts'
        }

    });

    const playgroundProdConfig = webpackMerge(sharedConfigFactory(env), {

        entry: {
            'main-playground': env.rootDirectory + '/src/main.playground.ts',
        }

    });

    const appProdConfig = webpackMerge(sharedConfigFactory(env), {

        module: {
            rules: [{
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loaders: [
                    '@ngtools/webpack'
                ]
            }]
        },

        entry: {
            'main-client': env.rootDirectory + '/src/main.ts'
        },

        plugins: [

            new webpack.ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, "", {}),

            new webpack.DefinePlugin({
                'process.env': {
                    'production': true
                }
            }),

            env.angularCompilerPlugin

        ]

    });

    if (isDevBuild) {
        return combinedDevConfig;
    } else {
        return env.includePlayground ? [
            appProdConfig, playgroundProdConfig
        ] : appProdConfig;
    }

};
