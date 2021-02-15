import { createGuid, FileItem } from "dgp-ng-app";

export const txtFileItem: FileItem = {
    fileItemId: createGuid(),
    fileName: "some-text",
    extension: "txt",
    size: 1000,
    creationDate: new Date(),
    url: "assets/some-txt.txt"
};
