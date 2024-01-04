import { FileItem } from "../file-viewer/models";

export function openFileItemInNewTab(payload: FileItem) {
    const a = document.createElement("a");
    a.href = payload.url;
    a.target = "_blank";
    a.click();
}
