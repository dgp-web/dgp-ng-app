const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin").TsconfigPathsPlugin;
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

/**
 * Factory for a shared-app tsconfig file
 *
 * @param env {{distDirectory: string, rootDirectory: string, tsconfigFile: string}}
 */
module.exports = function (env) {

    return {
        mode: "development",
        devtool: false,
        watch: true,

        devServer: {
            contentBase: env.distDirectory,
            hot: true
        },

        module: {
            rules: [{
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loaders: [{
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        configFile: env.tsconfigFile
                    }
                }, {
                    loader: 'angular2-template-loader',
                }]
            }, {
                test: /\.html$/,
                loader: 'raw-loader'
            }, {
                test: /\.css/,
                loader: 'raw-loader'
            }, {
                test: /\.scss$/,
                use: [{
                    loader: "raw-loader"
                }, {
                    loader: "sass-loader"
                }]
            }, {
                // https://github.com/angular/universal-starter/pull/593/files
                // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
                // Removing this will cause deprecation warnings to appear.
                test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                parser: { system: true },
            },]
        },

        resolve: {
            extensions: ['.js', '.ts'],
            plugins: [
                new TsconfigPathsPlugin()
            ]
        },

        stats: "errors-only",

        context: env.rootDirectory,

        output: {
            path: env.distDirectory,
            filename: '[name].js',
            // publicPath: '/public/'
        },

        plugins: [

            new webpack.ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, "", {}),
            new webpack.HotModuleReplacementPlugin(),

             new webpack.SourceMapDevToolPlugin({
                 filename: '[file].map',
                 moduleFilenameTemplate: path.relative(env.distDirectory, '[resourcePath]')
             }),

            /* new webpack.DllReferencePlugin({
                 context: '.',
                 manifest: require(
                     path.join(env.rootDirectory, env.distDirectory, "vendor-manifest.json")
                 )
             }),
 */
            new HardSourceWebpackPlugin()

        ]
    };

};
