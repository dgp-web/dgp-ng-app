import { EntityStateMap } from "entity-store";
import { InjectionToken } from "@angular/core";
import { MatDialogConfig } from "@angular/material";

export interface FileItem {
    readonly fileItemId: string;
    readonly fileName: string;
    readonly extension: string;
    /**
     * File size in bytes
     */
    readonly size: number;
    readonly url: string;
    readonly creationDate: Date;
    /**
     * Indicates whether this item has
     * already been saved.
     *
     * When a new item is uploaded, this
     * flag is true, so the developer
     * has a means of knowing which items to
     * persist.
     */
    readonly isSaved?: boolean;
}

export interface FileUploadConfig {
    readonly fileManagerMatDialogConfig: MatDialogConfig;
    readonly maximizedClass: string;
}

export const defaultFileUploadConfig: FileUploadConfig = {
    fileManagerMatDialogConfig: {
        height: "80%",
        width: "80%",
        panelClass: "dgp-file-manager-overlay"
    },
    maximizedClass: "--maximized"
};


export const FILE_UPLOAD_CONFIG = new InjectionToken<FileUploadConfig>("FileUploadConfig");

export interface FileUploadEntities {
    readonly fileItem: FileItem;
}

export interface FileUploadQueryParams {
    readonly fileItemId?: string;
}

export interface FileUploadState extends EntityStateMap<FileUploadEntities> {
    readonly isFileManagerOpen: boolean;
    readonly isDropTargetVisible: boolean;
}

export type FileUploadStoreFeature = "FileUpload";
export const fileUploadStoreFeature: FileUploadStoreFeature = "FileUpload";
