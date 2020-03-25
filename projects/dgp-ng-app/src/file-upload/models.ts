import { EntityStateMap } from "entity-store";
import { InjectionToken } from "@angular/core";
import { MatDialogConfig } from "@angular/material/dialog";
import { Directory, FileItem } from "../file-viewer/models";

export type OpenFileManagerShortKeyFilter = (x: KeyboardEvent) => boolean;

export interface FileUploadEditingCapabilities {
    readonly canAddFiles: boolean;
    readonly canRemoveFiles: boolean;
}

export interface FileUploadConfig {
    readonly fileManagerMatDialogConfig: MatDialogConfig;
    readonly maximizedClass: string;
    readonly openFileManagerShortKeyFilter: OpenFileManagerShortKeyFilter;
    readonly editingCapabilities: FileUploadEditingCapabilities;
}

export function openFileManagerShortKeyFilter(x: KeyboardEvent) {
    return  x.keyCode === 70 && x.altKey;
}

export const defaultFileUploadConfig: FileUploadConfig = {
    fileManagerMatDialogConfig: {
        height: "80%",
        width: "80%",
        panelClass: "dgp-file-manager-overlay"
    },
    maximizedClass: "--maximized",
    openFileManagerShortKeyFilter,
    editingCapabilities: {
        canAddFiles: true,
        canRemoveFiles: true
    }
};


export const FILE_UPLOAD_CONFIG = new InjectionToken<FileUploadConfig>("FileUploadConfig");

export interface FileUploadEntities {
    readonly directory: Directory;
    readonly fileItem: FileItem;
}

export interface FileUploadQueryParams {
    readonly fileItemId?: string;
}

export interface FileUploadState extends EntityStateMap<FileUploadEntities> {
    readonly isFileManagerOpen: boolean;
    readonly isDropTargetVisible: boolean;
    readonly initialConfig: FileUploadConfig;
}

export type FileUploadStoreFeature = "FileUpload";
export const fileUploadStoreFeature: FileUploadStoreFeature = "FileUpload";
