import { FileItem } from "../file-viewer/models";
import { createGuid } from "../broadcast/functions/create-guid.function";

export function parseFileNameWithExtension(fileNameWithExtension: string): {
    readonly extension: string;
    readonly fileName: string;
} {

    const lastPeriodIndex = fileNameWithExtension.indexOf(".");
    const extension = fileNameWithExtension.substring(lastPeriodIndex + 1, fileNameWithExtension.length);
    const fileName = fileNameWithExtension.substring(0, lastPeriodIndex);

    return {
        extension, fileName
    };
}

export function getMimeTypeFromExtension(extension: string): string {
    switch (extension) {
        case "pdf":
            return "application/pdf";
        default:
            return null;
    }
}

export function getFileItemsFromFileList(fileList: FileList): ReadonlyArray<FileItem> {

    const result = new Array<FileItem>();

    for (let i = 0; i < fileList.length; i++) {
        const file = fileList.item(i);

        const objectUrl = URL.createObjectURL(file);

        const fileItem: FileItem = {
            fileItemId: createGuid(),
            size: file.size,
            url: objectUrl,
            creationDate: new Date(file.lastModified),
            isSaved: false,
            ...parseFileNameWithExtension(file.name)
        };

        result.push(fileItem);

    }

    return result;

}

export function getFileFromFileItem$(fileItem: FileItem): Promise<File> {

    return new Promise<File>(resolve => {

        return fetch(fileItem.url, {
            credentials: "include"
        }).then(x => x.blob()).then(x => {
            const file = new Blob([x], {
                type: getMimeTypeFromExtension(fileItem.extension)
            });

            (file as any).name = fileItem.fileName + "." + fileItem.extension;

            resolve(file as File);
        }).catch(reason => {
            console.error(reason);
        });

    });

}
