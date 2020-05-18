const DgpNgAppTools = require("../index");
const dgpNgAppTools = DgpNgAppTools({
    rootDirectory: process.cwd()
});

module.exports = function () {
    return dgpNgAppTools.createWebpackVendorConfig();
};
