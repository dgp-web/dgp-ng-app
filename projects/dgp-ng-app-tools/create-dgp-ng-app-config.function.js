const path = require("path");
/**
 *
 * @param config {{rootDirectory: string, distDirectory?: string, testsMatcher?: string, tsconfigFile?: string, includePlayground?: boolean}}
 */
module.exports = function (config) {
    return {
        rootDirectory: path.join(config.rootDirectory, config.distDirectory),
        tsconfigFile: path.join(config.rootDirectory, config.tsconfigFile),
        distDirectory: path.join(config.rootDirectory, config.distDirectory),
    };
};

