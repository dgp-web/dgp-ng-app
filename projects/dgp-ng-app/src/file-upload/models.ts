import { EntityStateMap } from "entity-store";

export interface FileItem {
    readonly fileItemId: string;
    readonly label: string;
    readonly extension: string;
    /**
     * File size in bytes
     */
    readonly size: number;
    readonly url: string;
    readonly creationDate: Date;
}


export interface FileUploadEntities {
    readonly fileItem: FileItem;
}

export interface FileUploadState extends EntityStateMap<FileUploadEntities> {
}

export type FileUploadStoreFeature = "FileUpload";
export const fileUploadStoreFeature: FileUploadStoreFeature = "FileUpload";
