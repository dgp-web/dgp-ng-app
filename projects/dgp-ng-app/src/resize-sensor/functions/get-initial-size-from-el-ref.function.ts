import { ElementRef } from "@angular/core";
import { Size } from "../models/size.model";

export function getInitialSizeFromElRef(payload: ElementRef<HTMLDivElement>): Size {
    return {
        height: payload.nativeElement.clientHeight,
        width: payload.nativeElement.clientWidth
    } as Size;
}
