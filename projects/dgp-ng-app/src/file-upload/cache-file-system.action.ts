import { FileSystem } from "./file-system.model";
import { fileUploadEntityStore } from "./store";
import { createKVSFromArray } from "entity-store";

export function cacheFileSystem(payload: FileSystem) {
    return fileUploadEntityStore.actions.composeEntityActions({
        set: {
            fileItem: createKVSFromArray(payload.fileItems, x => x.fileItemId),
            directory: createKVSFromArray(payload.directories || [], x => x.directoryId),
        },
        select: {
            fileItem: payload.selectedFileItemId
                ? [payload.selectedFileItemId]
                : []
        }
    });
}
