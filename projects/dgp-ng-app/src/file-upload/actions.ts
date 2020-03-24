import { createAction, props } from "@ngrx/store";
import { FileUploadConfig } from "./models";
import { FileItem } from "../file-viewer/models";

export const openFileManagerOverlay = createAction("[FileUpload] OpenFileManagerOverlay", props<{
    readonly config?: FileUploadConfig;
    readonly fileItems?: ReadonlyArray<FileItem>;
} | null>());
export const openFileManager = openFileManagerOverlay;
export const closeFileManager = createAction("[FileUpload] CloseFileManager");

export const addFilesViaDrop = createAction("[FileUpload] AddFiles",
    props<{ readonly fileItems: ReadonlyArray<FileItem> }>()
);
export const addFiles = addFilesViaDrop;

export const removeFile = createAction("[FileUpload] RemoveFile",
    props<{ readonly fileItem: FileItem; }>()
);

export const showDropTarget = createAction("[FileUpload] ShowDropTarget");
export const hideDropTarget = createAction("[FileUpload] HideDropTarget");

export const setConfig = createAction("[FileUpload] SetConfig", props<{ readonly config: FileUploadConfig; }>());
