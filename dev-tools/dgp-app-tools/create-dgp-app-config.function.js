const path = require('path');
const defaultDgpAppConfig = require("./default-dgp-app-config.model");

/**
 *
 * @param config {{rootDirectory: string, distDirectory?: string, testsMatcher?: string, tsconfigFile?: string}}
 */
module.exports = function(config) {

    const mergedConfig = {
        ...defaultDgpAppConfig,
        ...config
    };

    return {
        ...mergedConfig,
        tsconfigFile: path.join(config.rootDirectory, mergedConfig.tsconfigFile),
        distDirectory: mergedConfig.distDirectory,
        testsMatcher: path.join(config.rootDirectory, mergedConfig.testsMatcher),
    };

};
