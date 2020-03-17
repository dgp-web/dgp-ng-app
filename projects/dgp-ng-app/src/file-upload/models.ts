export interface FileItem {
    readonly fileItemId: string;
    readonly label: string;
    readonly extension: string;
    /**
     * File size in bytes
     */
    readonly size: number;
    readonly url: string;
}
