import { Many } from "data-modeling";
import { Directory, FileItem } from "../file-viewer/models";

export interface FileSystem {
    readonly fileItems: Many<FileItem>;
    readonly selectedFileItemId?: string;
    readonly directories?: Many<Directory>;
}
