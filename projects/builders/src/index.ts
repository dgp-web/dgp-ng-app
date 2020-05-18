import { BuilderContext, BuilderOutput, createBuilder } from "@angular-devkit/architect";
import * as childProcess from "child_process";
import { JsonObject } from "@angular-devkit/core";

export interface DgpNgAppBuilderOptions extends JsonObject {
    readonly command: string;
    readonly args: Array<string>;
}

export default createBuilder(dgpNgAppBuilder);

function dgpNgAppBuilder(options: DgpNgAppBuilderOptions, context: BuilderContext) {
    console.log("Running dgp-ng-app-builder");

    return new Promise<BuilderOutput>(resolve => {

        const command = "dgp build --development " + options.args[0];
        console.log("Command: " + command);

        const child = childProcess.exec(command, (err, stdout, stderr) => {
            console.log("Started!");

            if (stdout !== null && stdout !== undefined) {
                console.log(stdout);
            }

            if (stderr !== null && stderr !== undefined) {
                console.error(stderr);
            }

            if (err !== null && err !== undefined) {
                console.error(err);
            }
        });

        if (child && child.stdout) {
            child.stdout.pipe(process.stdout);
        }

        if (child && child.stderr) {
            child.stderr.pipe(process.stderr);
        }

        child.on("error", (error: any) => {
            console.error(error);
            context.logger.error(error.toString());
        });

        context.reportStatus(`Done.`);
        child.on("close", (code: any) => {
            resolve({success: code === 0});
        });
    });
}
