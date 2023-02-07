# dgp-ng-app

This is a monorepository for dgp-ng-app, a collection of building blocks for Angular apps.

The documentation for users can be found here: [https://dgp-ng-app.firebaseapp.com](https://dgp-ng-app.firebaseapp.com)

This file describes how to build this project for contributors.

1. Install npm packages

````
npm install
````

2. Build Angular libraries and applications

This repository contains an Angular workspace with several libraries and applications.

Those components depend on each other and need to be built in the correct order.

Building the libraries

````
npm run dgp-ng-app:build:prod
npm run dgp-ng-docs:build:prod
npm run dgp-ng-charts:build:prod
npm run dgp-ng-drag-and-drop:build:prod
npm run dgp-ng-docking-layout:build:prod
npm run dgp-ng-paged-media:build:prod
````

Building the applications

````
npm run docs-app:build:prod
npm run dgp-labs:build:prod
````

There are development versions of most tasks.
Usually you should build all libraries once and then
- run their build task in watch mode
- run the build task of the needed application in serve mode

For instance if you're working on ``dgp-ng-app`` then run

````
npm run dgp-ng-app:build:watch
npm run docs-app:ng-serve
````

Or let's say you're working on some new chart features

````
npm run dgp-ng-charts:build:watch
npm run dgp-labs:ng-serve
````

3. Deployment

There are two build workflows configured for this workspace.
Commits on the ``develop`` branch trigger all libraries to be build
and the labs application to be deployed to https://dgp-labs.firebaseapp.com.

Commits on the ``master`` branch trigger all libraries to be build and published
to npm and the documentation and lab applications to be deployed to
https://dgp-ng-app.firebaseapp.com and https://dgp-labs.firebaseapp.com.

NOTE: Make sure to increment the versions in the ``package.json`` files of all libraries
before committing changes to the ``master`` branch, else the build is going to fail.

