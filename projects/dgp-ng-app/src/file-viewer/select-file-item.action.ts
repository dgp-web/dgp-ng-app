import { FileItemId } from "./models";
import { fileUploadEntityStore } from "../file-upload/store";

export function selectFileItem(payload: FileItemId) {
    return fileUploadEntityStore.actions.composeEntityActions({
        select: {
            fileItem: [payload.fileItemId]
        }
    });
}
