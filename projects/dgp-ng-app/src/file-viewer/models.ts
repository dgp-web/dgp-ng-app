import { InjectionToken, Type } from "@angular/core";
import { KVS } from "entity-store";

export interface FileItemId {
    readonly fileItemId: string;
}

export interface FileItem extends FileItemId {
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

export interface Directory {
    readonly directoryId: string;
    readonly label: string;
    readonly fileItemIds: ReadonlyArray<string>;
}

export interface FileTypeViewerMap {
    [key: string]: Type<any>;
}

export const FILE_VIEWER_CONFIG = new InjectionToken<FileViewerConfig>("DgpFileViewerConfig");

export interface FileViewerConfig {
    readonly fileTypeViewerMap: FileTypeViewerMap;
}

export interface FileItemListModel {
    readonly fileItemKVS: KVS<FileItem>;
    readonly directories: ReadonlyArray<Directory>;
}

