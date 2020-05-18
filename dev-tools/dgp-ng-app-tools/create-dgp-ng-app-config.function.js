const createDgpAppConfig = require("dgp-app-tools/create-dgp-app-config.function");

/**
 *
 * @param config {{rootDirectory: string, distDirectory?: string, testsMatcher?: string, tsconfigFile?: string, includePlayground?: boolean}}
 */
module.exports = function(config) {
    return createDgpAppConfig(config);
};

