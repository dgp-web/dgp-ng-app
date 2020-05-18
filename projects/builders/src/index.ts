import { BuilderContext, BuilderOutput, createBuilder } from "@angular-devkit/architect";
import * as childProcess from "child_process";
import { JsonObject } from "@angular-devkit/core";
import * as path from "path";
export * from "./webpack.config.vendor";

export interface DgpNgAppBuilderOptions extends JsonObject {
    readonly outputPath: string;
    readonly main: string;
    readonly index: string;
    readonly tsConfig: string;
    readonly polyfills: string;
}

export default createBuilder(dgpNgAppBuilder);

function dgpNgAppBuilder(options: DgpNgAppBuilderOptions, context: BuilderContext) {
    console.log("Running dgp-ng-app-builder");

    return new Promise<BuilderOutput>(resolve => {

        // TODO: then do webpack

        const webpackConfigPath = path.join(
            process.cwd(),
            "node_modules/dgp-ng-app-builder/src/webpack.config.vendor.js"
        );

        // const command = "dgp build --projectPath projects/dgp-labs --distPath dist/dgp-labs";
        const command = `webpack --config ${webpackConfigPath} --env.projectPath projects/dgp-labs --env.distPath dist/dgp-labs`;
        console.log("Command: " + command);

        const child = childProcess.exec(command, err => {
            if (err !== null && err !== undefined) {
                console.error(err);
            }
        });

        if (child && child.stdout) {
            child.stdout.pipe(process.stdout);
        }
/*
        if (child && child.stderr) {
            child.stderr.pipe(process.stderr);
        }*/


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
