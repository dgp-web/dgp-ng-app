import { Input, Directive } from "@angular/core";
import { FileItem } from "../models";

@Directive()
export class ViewerComponentBase {
    @Input()
    fileItem: FileItem;
}
