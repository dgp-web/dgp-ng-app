import { Input } from "@angular/core";
import { FileItem } from "../models";

export class ViewerComponentBase {
    @Input()
    fileItem: FileItem;
}
