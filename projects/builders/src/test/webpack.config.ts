import * as HardSourceWebpackPlugin from "hard-source-webpack-plugin";
import * as path from "path";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import * as webpack from "webpack";

export interface WebpackConfig {
    readonly projectPath: string;
    readonly tsconfigFile: string;
    readonly distPath: string;
}

module.exports = (env: WebpackConfig) => {

    const config = {
        rootDirectory: env.projectPath,
        distDirectory: env.distPath
    };

    const tsconfigFile = path.join(config.rootDirectory, env.tsconfigFile);

    // noinspection RegExpSingleCharAlternation
    return {
        mode: "development",
        devtool: false,
        watch: true,

        module: {
            rules: [{
                test: /\.ts$/,
                loaders: [{
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                        configFile: tsconfigFile,
                        compilerOptions: {
                            emitDecoratorMetadata: true,
                            experimentalDecorators: true,
                            target: "es2015",
                            sourceMap: false,
                            module: "commonjs",
                            moduleResolution: "node"
                        }
                    }
                }, {
                    loader: "angular2-template-loader"
                }]
            }, {
                test: /\.html$/,
                loaders: [{
                    loader: "raw-loader",
                    options: {
                        esModule: false,
                    }
                }]
            }, {
                test: /\.css/,
                loaders: [{
                    loader: "raw-loader",
                    options: {
                        esModule: false,
                    }
                }]
            }, {
                test: /\.scss$/,
                loaders: [{
                    loader: "raw-loader",
                    options: {
                        esModule: false,
                    }
                }, {
                    loader: "sass-loader"
                }]
            }, {
                // https://github.com/angular/universal-starter/pull/593/files
                // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
                // Removing this will cause deprecation warnings to appear.
                test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                parser: {system: true},
            }]
        },

        resolve: {
            extensions: [".js", ".ts"],
            plugins: [
                new TsconfigPathsPlugin()
            ]
        },

        stats: "errors-only",

        context: config.rootDirectory,

        output: {
            path: config.distDirectory,
            filename: "[name].js"
        },

        plugins: [

            new webpack.ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, "", {}),

            new webpack.SourceMapDevToolPlugin({
                filename: "[file].map",
                moduleFilenameTemplate: path.relative(config.distDirectory, "[resourcePath]")
            }),

            new webpack.DllReferencePlugin({
                context: ".",
                manifest: require(path.join(config.distDirectory, "vendorTest-manifest.json"))
            }),

            new HardSourceWebpackPlugin()

        ]
    };

};
