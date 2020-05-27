const path = require("path");
const webpack = require("webpack");

export interface WebpackVendorConfig {
    readonly projectPath: string;
    readonly distPath: string;
    readonly additionalVendorLibraries: string;
}

/**
 * Factory for a tsconfig file for specs
 */
module.exports = (env: WebpackVendorConfig) => {

    const config = {
        rootDirectory: path.join(process.cwd(), env.projectPath),
        distDirectory: path.join(process.cwd(), env.distPath),
        additionalVendorLibraries: env.additionalVendorLibraries
            ? env.additionalVendorLibraries.split("&")
            : []
    };

    // noinspection RegExpSingleCharAlternation
    return {

        stats: {
            modules: false
        },
        mode: "development",
        devtool: false,
        resolve: {
            extensions: [".js"]
        },
        entry: {
            vendor: [
                "core-js",
                "reflect-metadata",
                "zone.js/dist/zone",
                "rxjs",
                "lodash",
                "entity-store",
                "@angular/animations",
                "@angular/cdk",
                "@angular/common",
                "@angular/common/http",
                "@angular/compiler",
                "@angular/core",
                "@angular/forms",
                "@angular/material/autocomplete",
                "@angular/material/badge",
                "@angular/material/bottom-sheet",
                "@angular/material/button",
                "@angular/material/checkbox",
                "@angular/material/chips",
                "@angular/material/datepicker",
                "@angular/material/dialog",
                "@angular/material/divider",
                "@angular/material/form-field",
                "@angular/material/icon",
                "@angular/material/input",
                "@angular/material/list",
                "@angular/material/menu",
                "@angular/material/progress-bar",
                "@angular/material/progress-spinner",
                "@angular/material/radio",
                "@angular/material/select",
                "@angular/material/slide-toggle",
                "@angular/material/snack-bar",
                "@angular/material/table",
                "@angular/material/tabs",
                "@angular/material/toolbar",
                "@angular/material/tooltip",
                "@angular/platform-browser",
                "@angular/platform-browser-dynamic",
                "@angular/router",
                "@angularclass/hmr",
                "@ngrx/store",
                "@ngrx/effects",
                "@ngrx/store-devtools"
            ].concat(config.additionalVendorLibraries)
        },
        module: {
            rules: [{
                test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                parser: {system: true},
            }]
        },
        output: {
            filename: "[name].js",
            library: "[name]_[hash]",
            publicPath: "/",
            path: config.distDirectory
        },
        plugins: [
            new webpack.ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, "", {}),

            new webpack.DllPlugin({
                path: path.join(config.distDirectory, "[name]-manifest.json"),
                name: "[name]_[hash]"
            })
        ]

    };

};
