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
        rootDirectory: path.join(process.cwd(), env.projectPath),
        distDirectory: path.join(process.cwd(), env.distPath)
    };

    const tsconfigFile = path.join(config.rootDirectory, env.tsconfigFile);

    // noinspection RegExpSingleCharAlternation
    return {
        mode: "development",
        devtool: false,
        watch: true,

        devServer: {
            contentBase: config.distDirectory,
            hot: true,
            historyApiFallback: {
                disableDotRule: true
            },
            writeToDisk: true
        },
        entry: {
            main: path.join(config.rootDirectory + "/src/main.ts")
        },
        module: {
            rules: [{
                test: /\.ts$/,
                use: [{
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                        configFile: tsconfigFile,
                        compilerOptions: {
                            emitDecoratorMetadata: true,
                            experimentalDecorators: true,
                            target: "es2015",
                            sourceMap: false
                        }
                    },
                }, "angular2-template-loader"]
            }, {
                test: /\.html$/,
                loader: "raw-loader",
                options: {
                    esModule: false,
                }
            }, {
                test: /\.css/,
                loader: "raw-loader",
                options: {
                    esModule: false,
                }
            }, {
                test: /\.scss$/,
                use: [{
                    loader: "raw-loader",
                    options: {
                        esModule: false,
                    },
                }, "sass-loader"]
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
                // context: ".",
                manifest: require(path.join(config.distDirectory, "vendor-manifest.json"))
            }),

            // new HardSourceWebpackPlugin()

        ]
    };

};
