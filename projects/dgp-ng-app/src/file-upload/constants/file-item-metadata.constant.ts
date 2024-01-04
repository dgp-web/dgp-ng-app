import { ModelMetadata } from "data-modeling";
import { Directory, FileItem } from "../../file-viewer/models";

export const fileItemMetadata: ModelMetadata<FileItem> = {
    id: x => x.fileItemId
};
