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
            vendor: []
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
