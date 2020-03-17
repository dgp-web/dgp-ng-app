import { createAction, props } from "@ngrx/store";
import { FileItem } from "dgp-ng-app/file-upload/models";

export const openFileOverlay = createAction("[FileUpload] OpenFileOverlay");

export const addFilesViaDrop = createAction("[FileUpload] AddFilesViaDrop", props<{ readonly fileItems: ReadonlyArray<FileItem> }>());
