const path = require('path');
const webpack = require('webpack');

/**
 * Factory for a tsconfig file for specs
 *
 * @param env {{distDirectory: string, rootDirectory: string}}
 */
module.exports = function (env) {

    return {

        stats: {
            modules: false
        },
        mode: 'development',
        devtool: false,
        resolve: {
            extensions: ['.js']
        },
        entry: {
            vendor: [
                'core-js/es6/symbol',
                'core-js/es6/object',
                'core-js/es6/function',
                'core-js/es6/parse-int',
                'core-js/es6/parse-float',
                'core-js/es6/number',
                'core-js/es6/math',
                'core-js/es6/string',
                'core-js/es6/date',
                'core-js/es6/array',
                'core-js/es6/regexp',
                'core-js/es6/map',
                'core-js/es6/set',
                'core-js/es6/reflect',
                'core-js/es7/array',
                'core-js/es7/reflect'
            ]
        },
        output: {
            filename: '[name].js',
            library: '[name]_[hash]',
            publicPath: '/',
            path: path.join(env.rootDirectory, env.distDirectory)
        },
        plugins: [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map',
                moduleFilenameTemplate: path.relative(env.distDirectory, '[resourcePath]')
            }),
            new webpack.DllPlugin({
                path: path.join(env.rootDirectory, env.distDirectory, '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ]

    };

};
