import { createGuid, FileItem } from "dgp-ng-app";

export const jpgFileItem: FileItem = {
    fileItemId: createGuid(),
    fileName: "github-logo",
    extension: "jpg",
    size: 6.72 * 1000,
    creationDate: new Date(),
    url: "assets/github-logo-dark.jpg"
};
