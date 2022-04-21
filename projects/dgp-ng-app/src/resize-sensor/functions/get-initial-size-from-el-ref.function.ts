import { ElementRef } from "@angular/core";
import { Size } from "../models/size.model";

export function getInitialSize(payload: HTMLElement): Size {
    return {
        height: payload.clientHeight,
        width: payload.clientWidth
    } as Size;
}

export function getInitialSizeFromElRef(payload: ElementRef<HTMLElement>): Size {
    return getInitialSize(payload.nativeElement);
}
