const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin").TsconfigPathsPlugin;
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

/**
 * Factory for a shared-app tsconfig file
 *
 * @param env {{development: boolean, distDirectory: string, rootDirectory: string, tsconfigFile: string}}
 * @returns {{mode: string, devtool: boolean, output: {path: string, filename: string, publicPath: string}, resolve: {extensions: string[], plugins: TsconfigPathsPlugin[]}, stats: string, plugins: (webpack.ContextReplacementPlugin|ContextReplacementPlugin)[], module: {rules: *[]}, context: string}}
 */
module.exports = function (env) {

    const isDevBuild = (env !== null && env !== undefined) && env.development === true;
    const mode = isDevBuild ? "development" : "production";

    return {
        mode: mode,
        devtool: false,

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
            }]
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
            path: path.join(env.rootDirectory, env.distDirectory),
            filename: '[name].js',
            publicPath: isDevBuild ? '/public/' : ''
        },

        plugins: [

            new webpack.ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, "", {})

        ].concat(isDevBuild ? [

            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map',
                moduleFilenameTemplate: path.relative(env.distDirectory, '[resourcePath]')
            }),

            new webpack.DllReferencePlugin({
                context: '.',
                manifest: require(
                    path.join(env.rootDirectory, env.distDirectory, "vendor-manifest.json")
                )
            }),

            new webpack.DefinePlugin({
                'process.env': {
                    'development': true
                }
            }),

            new HardSourceWebpackPlugin()

        ] : [

            new webpack.DefinePlugin({
                'process.env': {
                    'production': true
                }
            })

        ])
    };

};
