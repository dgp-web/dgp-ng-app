import { HTMlElementType } from "./html-element-type.model";

export interface HTMLElementContainer {
    type: HTMlElementType;
    nativeElement: HTMLElement;
}
