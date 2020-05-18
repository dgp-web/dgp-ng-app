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
                'core-js',
                'reflect-metadata',
                'zone.js/dist/zone',
                'rxjs',
                'lodash',
                'entity-store',
                '@angular/animations',
                '@angular/cdk',
                '@angular/common',
                '@angular/compiler',
                '@angular/core',
                '@angular/forms',
                '@angular/material/button',
                '@angular/material/dialog',
                '@angular/material/drawer',
                '@angular/material/form-field',
                '@angular/material/input',
                '@angular/material/select',
                '@angular/material/slide-toggle',
                '@angular/material/tabs',
                '@angular/platform-browser',
                '@angular/platform-browser-dynamic',
                '@angular/router',
                '@angularclass/hmr',
                '@ngrx/store',
                '@ngrx/effects',
                '@ngrx/store-devtools',
                // 'dgp-ng-app'
            ]
        },
        module: {
            rules: [{
                test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                parser: {system: true},
            }]
        },
        output: {
            filename: '[name].js',
            library: '[name]_[hash]',
            publicPath: '/',
            path: env.distDirectory
        },
        plugins: [
            new webpack.ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, "", {}),
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map',
                moduleFilenameTemplate: path.relative(env.distDirectory, '[resourcePath]')
            }),
            new webpack.DllPlugin({
                path: path.join(env.distDirectory, '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ]

    };

};
