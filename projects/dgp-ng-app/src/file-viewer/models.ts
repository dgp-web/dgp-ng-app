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
    readonly type: string;
}
