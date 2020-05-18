"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const architect_1 = require("@angular-devkit/architect");
const childProcess = require("child_process");
exports.default = architect_1.createBuilder((options, context) => {
    return new Promise((resolve, reject) => {
        context.reportStatus(`Executing "${options.command}"...`);
        const child = childProcess.spawn(options.command, options.args, { stdio: "pipe" });
        child.stdout.on("data", (data) => {
            context.logger.info(data.toString());
        });
        child.stderr.on("data", (data) => {
            context.logger.error(data.toString());
            reject();
        });
        context.reportStatus(`Done.`);
        child.on("close", code => {
            resolve({ success: code === 0 });
        });
    });
});
//# sourceMappingURL=index.js.map