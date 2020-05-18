const webpackMerge = require('webpack-merge');
const createBaseWebpackVendor = require("dgp-app-tools/webpack-vendor-config.factory");

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
                'lodash',
                'rxjs',
                'rxjs/operators'
            ]
        }
    });

};
