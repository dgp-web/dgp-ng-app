import { InjectionToken, Type } from "@angular/core";

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
