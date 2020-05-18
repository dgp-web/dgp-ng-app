const createDgpNgAppConfig = require("./create-dgp-ng-app-config.function");
const createKarmaConfig = require("./create-karma-config.function");
const createWebpackAppConfig = require("./webpack-app-config.factory");
const createWebpackVendorConfig = require("./webpack-vendor-config.factory");

module.exports = function(config) {

    const _config = createDgpNgAppConfig(config);

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
