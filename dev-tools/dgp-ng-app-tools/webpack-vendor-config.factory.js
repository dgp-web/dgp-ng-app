const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const createBaseWebpackVendor = require("../dgp-app-tools/webpack-vendor-config.factory");

/**
 * Factory for a tsconfig file for specs
 *
 * @param env {{distDirectory: string, rootDirectory: string}}
 */
module.exports = function (env) {

    var baseConfig = createBaseWebpackVendor(env);

    return webpackMerge(baseConfig, {
        entry: {
            vendor: [
                /*'zone.js/dist/zone',
                'hammerjs',
                'rxjs',
                'lodash',
                'entity-store',
                '@angular/animations',
                '@angular/cdk',
                '@angular/common',
                '@angular/compiler',
                '@angular/core',
                '@angular/forms',
                '@angular/material',
                '@angular/platform-browser',
                '@angular/platform-browser-dynamic',
                '@angular/router',
                '@angularclass/hmr',
                '@ngrx/store',
                '@ngrx/effects',
                '@ngrx/store-devtools'*/
            ]
        },
        module: {
            rules: [{
                test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                parser: {system: true},
            }]
        },
        plugins: [
            new webpack.ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, "", {})
        ]

    });

};
