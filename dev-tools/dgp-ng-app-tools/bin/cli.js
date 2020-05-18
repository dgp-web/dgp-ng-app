#!/usr/bin/env node

const argv = require('yargs').argv;
const projectPath = argv.projectPath;
const distPath = argv.distPath;

// This helps exectute scripts
function execute(command) {

    const exec = require('child_process').exec;

    const child = exec(command, (err, stdout, stderr) => {
        if (err !== null && err !== undefined) {
            console.error(err);
        }
    });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
}

const commandName = argv["_"][0];
const development = argv.development;

execute("webpack                        --config " + __dirname + "\\webpack.config.vendor.js    --env.projectPath=" + projectPath + " --env.distPath=" + distPath);
execute("webpack-dev-server --port=4200 --config " + __dirname + "\\webpack.config.js           --env.projectPath=" + projectPath + " --env.distPath=" + distPath);

