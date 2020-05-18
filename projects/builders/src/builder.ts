import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import * as childProcess from "child_process";
import { JsonObject } from "@angular-devkit/core";
import * as path from "path";
import { BuilderOutput } from "@angular-devkit/architect/src/api";

export * from "./webpack.config.vendor";
export * from "./webpack.config";

export interface DgpNgAppBuilderOptions extends JsonObject {
    readonly outputPath: string;
    readonly main: string;
    readonly index: string;
    readonly tsConfig: string;
    readonly polyfills: string;
}

async function createVendorBundle(options: DgpNgAppBuilderOptions, context: BuilderContext) {

    return new Promise((resolve, reject) => {

        const webpackConfigPath = path.join(
            process.cwd(),
            "node_modules/dgp-ng-app-builder/src/webpack.config.vendor.js"
        );

        const command = `webpack --config ${webpackConfigPath} --env.projectPath projects/dgp-labs --env.distPath dist/dgp-labs`;

        const child = childProcess.exec(command, err => {
            if (err !== null && err !== undefined) {
                console.error(err);
            }
        });

        if (child && child.stdout) {
            child.stdout.pipe(process.stdout);
        }

        child.on("error", (error: any) => {
            console.error(error);
            context.logger.error(error.toString());
        });

        child.on("close", (code: any) => {
            resolve({success: code === 0});
        });
    });


}

async function runWebpack(options: DgpNgAppBuilderOptions, context: BuilderContext) {

    return new Promise((resolve, reject) => {

        const webpackConfigPath = path.join(
            process.cwd(),
            "node_modules/dgp-ng-app-builder/src/webpack.config.js"
        );

        const command = `webpack-dev-server --port=4200 --config ${webpackConfigPath} --env.projectPath projects/dgp-labs --env.distPath dist/dgp-labs  --env.tsconfigFile tsconfig.app.json`;

        const child = childProcess.exec(command, err => {
            if (err !== null && err !== undefined) {
                console.error(err);
            }
        });

        if (child && child.stdout) {
            child.stdout.pipe(process.stdout);
        }

        child.on("error", (error: any) => {
            console.error(error);
            context.logger.error(error.toString());
        });

        child.on("close", (code: any) => {
            resolve({success: code === 0});
        });
    });

}


export default createBuilder(dgpNgAppBuilder);

function dgpNgAppBuilder(options: DgpNgAppBuilderOptions, context: BuilderContext) {

    return new Promise<BuilderOutput>(async (resolve, reject) => {
        await createVendorBundle(options, context);
        await runWebpack(options, context);
    });
}
