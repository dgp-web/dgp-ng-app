import { Input, Directive } from "@angular/core";
import { FileItem } from "../models";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class ViewerComponentBase {
    @Input()
    fileItem: FileItem;
}
