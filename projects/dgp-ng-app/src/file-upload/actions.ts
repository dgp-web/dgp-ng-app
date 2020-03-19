import { createAction, props } from "@ngrx/store";
import { FileItem } from "./models";

export const openFileManagerOverlay = createAction("[FileUpload] OpenFileManagerOverlay");
export const openFileManager = openFileManagerOverlay;
export const closeFileManager = createAction("[FileUpload] CloseFileManager");

export const addFilesViaDrop = createAction("[FileUpload] AddFilesViaDrop",
    props<{ readonly fileItems: ReadonlyArray<FileItem> }>()
);

export const removeFile = createAction("[FileUpload] RemoveFile",
    props<{ readonly fileItem: FileItem; }>()
);
