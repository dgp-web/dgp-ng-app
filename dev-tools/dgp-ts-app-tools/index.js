const createDgpTsAppConfig = require("./create-dgp-ts-app-config.function");
const createKarmaConfig = require("./create-karma-config.function");
const createWebpackVendorConfig = require("./webpack-vendor-config.factory");

module.exports = function(config) {

    const _config = createDgpTsAppConfig(config);

    return {
        createKarmaConfig: function(conf) {
            return createKarmaConfig({
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
