const createDgpAppConfig = require("./create-dgp-app-config.function");
const createKarmaConfig = require("./create-karma-config.function");
const createWebpackAppConfig = require("./webpack-app-config.factory");
const createWebpackVendorConfig = require("./webpack-vendor-config.factory");

module.exports = function(config) {

    const _config = createDgpAppConfig(config);

    return {
        createKarmaConfig: function(conf) {
            return createKarmaConfig({
                ..._config,
                ...conf
            });
        },
        createWebpackAppConfig: function(conf) {
            return createWebpackAppConfig({
                ..._config,
                ...conf
            });
        },
        createWebpackVendorConfig: function(conf) {
            return createWebpackVendorConfig({
                ..._config,
                ...conf
            });
        },
    };

};
