Error.stackTraceLimit = Infinity;

require("core-js");

require("zone.js/dist/zone");
require("zone.js/dist/long-stack-trace-zone");
require("zone.js/dist/proxy");
require("zone.js/dist/sync-test");
require("zone.js/dist/jasmine-patch");
require("zone.js/dist/async-test");
require("zone.js/dist/fake-async-test");

require("rxjs");

const requireContext = require("require-context");
const testing = require("@angular/core/testing");
const browser = require("@angular/platform-browser-dynamic/testing");

export function createTestsMatcher(projectPath) {

    testing.TestBed.initTestEnvironment(
        browser.BrowserDynamicTestingModule,
        browser.platformBrowserDynamicTesting()
    );

    const testContext = requireContext(projectPath + "/src/", true, /\.spec\.ts$/);

    function importAll(r) {
        return r.keys().map(r);
    }


    const modules = importAll(testContext);

}
