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

if (commandName === "test") {
    if (development === true) {
        execute("karma start " + __dirname + "\\karma.conf.js --development");
    } else {
        execute("karma start " + __dirname + "\\karma.conf.js");
    }
} else if (commandName === "vendor") {
    execute("webpack --config " + __dirname + "\\webpack.config.vendor.js");
} else if (commandName === "build") {
    execute("webpack --config " + __dirname + "\\webpack.config.js --env.projectPath=" + projectPath + " --env.distPath=" + distPath);
}


