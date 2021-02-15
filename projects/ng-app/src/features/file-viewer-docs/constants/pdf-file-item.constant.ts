import { createGuid, FileItem } from "dgp-ng-app";

export const pdfFileItem: FileItem = {
    fileItemId: createGuid(),
    fileName: "github-logo",
    extension: "pdf",
    size: 9.77 * 1000,
    creationDate: new Date(),
    url: "assets/github-logo-dark.pdf"
};
