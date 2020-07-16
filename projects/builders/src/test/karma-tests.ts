Error.stackTraceLimit = Infinity;

require("core-js/es6");
require("core-js/es7/reflect");

require("zone.js/dist/zone");
require("zone.js/dist/long-stack-trace-zone");
require("zone.js/dist/proxy");
require("zone.js/dist/sync-test");
require("zone.js/dist/jasmine-patch");
require("zone.js/dist/async-test");
require("zone.js/dist/fake-async-test");

require("rxjs");

const testing = require("@angular/core/testing");
const browser = require("@angular/platform-browser-dynamic/testing");

export function createTestsMatcher(projectPath) {

    testing.TestBed.initTestEnvironment(
        browser.BrowserDynamicTestingModule,
        browser.platformBrowserDynamicTesting()
    );
    // TODO: Replace this source crap
    const testContext = (require as any).context(projectPath + "/src", true, /\.spec\.ts$/);


    function requireAll(requireContext) {
        return requireContext.keys().map(requireContext);
    }


    const modules = requireAll(testContext);

}
