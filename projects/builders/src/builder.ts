import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import { BuilderOutput } from "@angular-devkit/architect/src/api";
import { JsonObject } from "@angular-devkit/core";
import * as childProcess from "child_process";
import * as fs from "fs";
import * as path from "path";

export * from "./webpack.config.vendor";
export * from "./webpack.config";

export interface DgpNgAppBuilderOptions extends JsonObject {
    readonly projectName: string;
}


async function createVendorBundle(options: DgpNgAppBuilderOptions, context: BuilderContext) {

    return new Promise((resolve, reject) => {

        const webpackConfigPath = path.join(
            process.cwd(),
            "node_modules/dgp-ng-app-builder/src/webpack.config.vendor.js"
        );

        const command = `webpack --config ${webpackConfigPath} --env.projectPath projects/${options.projectName} --env.distPath dist/${options.projectName}`;

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

const scriptsSnippet = `
    <script src="vendor.js"></script>
    <script src="main.js"></script>
`;

async function copyAndModifyIndexHtmlToDist(options: DgpNgAppBuilderOptions, context: BuilderContext) {

    return new Promise((resolve, reject) => {

        const indexHTMLPath = path.join(
            process.cwd(),
            "projects",
            options.projectName,
            "src",
            "index.html"
        );

        const destinationPath = path.join(
            process.cwd(),
            "dist",
            options.projectName,
            "index.html"
        );

        const indexHTML = fs.readFileSync(indexHTMLPath, "utf8");
        const updatedIndexHTML = indexHTML.replace("</body>", `${scriptsSnippet}</body>`);

        fs.writeFileSync(destinationPath, updatedIndexHTML);
        resolve();
    });

}

async function runWebpack(options: DgpNgAppBuilderOptions, context: BuilderContext) {

    return new Promise((resolve, reject) => {

        const webpackConfigPath = path.join(
            process.cwd(),
            "node_modules/dgp-ng-app-builder/src/webpack.config.js"
        );

        // TODO: Take HTML file and copy it to dist and add

        const command = `webpack-dev-server --port=4200 --config ${webpackConfigPath} --env.projectPath projects/${options.projectName} --env.distPath dist/${options.projectName}  --env.tsconfigFile tsconfig.app.json`;

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
        await copyAndModifyIndexHtmlToDist(options, context);
        await runWebpack(options, context);
        resolve();
    });
}
