import { createGuid, FileItem } from "dgp-ng-app";

export const pngFileItem: FileItem = {
    fileItemId: createGuid(),
    fileName: "github-logo",
    extension: "png",
    size: 15 * 1000,
    creationDate: new Date(),
    url: "assets/github-logo.png"
};
