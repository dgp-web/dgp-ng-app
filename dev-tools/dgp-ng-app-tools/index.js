const createWebpackAppConfig = require("./webpack-app-config.factory");
const createWebpackVendorConfig = require("./webpack-vendor-config.factory");

module.exports = function(config) {

    return {
        createWebpackAppConfig: function(conf) {
            return createWebpackAppConfig({
                ...config,
                ...conf
            });
        },
        createWebpackVendorConfig: function(conf) {
            return createWebpackVendorConfig({
                ...config,
                ...conf
            });
        },
    };

};
