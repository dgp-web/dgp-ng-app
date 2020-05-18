#!/usr/bin/env node

const argv = require('yargs').argv;

// This helps exectute scripts
function execute(command) {

    const exec = require('child_process').exec;

    const child = exec(command, (err, stdout, stderr) => {
        if (err !== null && err !== undefined) {
            console.error(err);
        }
    });

    child.stdout.pipe(process.stdout)
}


const commandName = argv["_"][0];
const development = argv.development;

const includePlayground = argv["includePlayground"] ? true : false;

if (commandName === "test") {
    if (development === true) {
        execute("karma start " + __dirname + "\\karma.conf.js --development");
    } else {
        execute("karma start " + __dirname + "\\karma.conf.js");
    }
} else if (commandName === "vendor") {
    execute("webpack --config " + __dirname + "\\webpack.config.vendor.js");
} else if (commandName === "build") {
    if (includePlayground) {
        execute("angular-playground --no-serve --no-watch");
    }
    execute("webpack --config " + __dirname + "\\webpack.config.js --env.development=false" + " --include-playground=" + includePlayground);
}


