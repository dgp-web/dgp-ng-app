import { BuilderContext, createBuilder } from "@angular-devkit/architect";
import { BuilderOutput } from "@angular-devkit/architect/src/api";
import { JsonObject } from "@angular-devkit/core";
import * as childProcess from "child_process";
import * as fs from "fs";
import * as path from "path";

const cpx = require("cpx");
const sass = require("sass");

export * from "./webpack.config";

export interface DgpNgAppBuilderOptions extends JsonObject {
    readonly projectName: string;
    readonly baseHref: string;
    readonly assets: Array<string>;
    readonly scripts: Array<string>;
    readonly styles: Array<string>;
}

const scriptsSnippet = `
    <script src="main.js"></script>
`;

export function createBasePathSnippet(basePath: string) {
    return `
       <base href="${basePath}">
    `;
}

export function createScriptSnippet(src: string) {
    return `
        <script src="${src}"></script>
    `;
}

export function createStyleSheetSnippet(src: string) {
    return `
        <link rel="stylesheet" href="${src}">
    `;
}

async function copyAndModifyIndexHtmlToDist(options: DgpNgAppBuilderOptions, context: BuilderContext) {

    return new Promise<void>((resolve, reject) => {

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
            options.projectName
        );

        const destinationHTMLPath = path.join(
            process.cwd(),
            "dist",
            options.projectName,
            "index.html"
        );

        const baseHref = options.baseHref || "/";

        const indexHTML = fs.readFileSync(indexHTMLPath, "utf8");
        let updatedIndexHTML = indexHTML.replace("</body>", `${scriptsSnippet}</body>`);

        if (updatedIndexHTML.includes(`<base href="/">`)) {
            updatedIndexHTML = updatedIndexHTML.replace(`<base href="/">`, `${createBasePathSnippet(baseHref)}`);
        } else {
            updatedIndexHTML = updatedIndexHTML.replace("<head>", `<head>${createBasePathSnippet(baseHref)}`);
        }

        if (options.scripts !== null && options.scripts !== undefined) {

            options.scripts.reverse().forEach(script => {
                const scriptSourcePath = path.join(process.cwd(), script);
                const scriptFileName = scriptSourcePath.replace(/^.*[\\\/]/, "");

                cpx.copySync(scriptSourcePath, destinationPath);

                const scriptSnippet = createScriptSnippet(scriptFileName);

                updatedIndexHTML = updatedIndexHTML.replace("</head>", `${scriptSnippet}</head>`);
            });

        }

        if (options.assets !== null && options.assets !== undefined) {

            options.assets.reverse().forEach(asset => {
                const assetSourcePath = path.join(process.cwd(), asset);
                const assetTargetPath = path.join(destinationPath, "assets");

                cpx.copySync(assetSourcePath, assetTargetPath);
            });

        }

        if (options.styles !== null && options.styles !== undefined) {
            options.styles.reverse().forEach(style => {
                const styleSourcePath = path.join(process.cwd(), style);
                const styleFileName = styleSourcePath.replace(/^.*[\\\/]/, "").replace("scss", "css");
                const styleTargetPath = path.join(destinationPath, styleFileName);

                const result = sass.renderSync({
                    file: styleSourcePath,
                    sourceMap: false,
                    outFile: styleTargetPath,
                    importer: (url, prev, done) => {
                        // ...
                        if (url[0] === "~") {
                            url = path.resolve("node_modules", url.substr(1));
                        }

                        return {file: url};
                    },
                });

                fs.writeFileSync(styleTargetPath, result.css);
                const styleSheetSnippet = createStyleSheetSnippet(styleFileName);
                updatedIndexHTML = updatedIndexHTML.replace("</head>", `${styleSheetSnippet}</head>`);
            });
        }

        fs.writeFileSync(destinationHTMLPath, updatedIndexHTML);
        resolve();
    });

}

async function runWebpack(options: DgpNgAppBuilderOptions, context: BuilderContext) {

    return new Promise((resolve, reject) => {

        const webpackConfigPath = path.join(
            process.cwd(),
            "node_modules/dgp-ng-app-builder/src/build/webpack.config.js"
        );

        const command = `webpack --config ${webpackConfigPath} --env.projectPath projects/${options.projectName} --env.distPath dist/${options.projectName}  --env.tsconfigFile tsconfig.app.json`;

        console.log("Command: ");
        console.log(command);

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
        await copyAndModifyIndexHtmlToDist(options, context);
        await runWebpack(options, context);

        resolve({success: true});
    });

}
