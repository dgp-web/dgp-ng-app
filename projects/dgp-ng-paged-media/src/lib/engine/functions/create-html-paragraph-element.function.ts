import { HTMLElementContainer, HTMlElementType } from "../models";

export function createHTMLParagraphElement(htmlItem: HTMLElement): HTMLElementContainer {
    return {
        type: HTMlElementType.Paragraph,
        nativeElement: htmlItem
    };
}

export function createHTMLTableElement(htmlItem: HTMLElement): HTMLElementContainer {
    return {
        type: HTMlElementType.Table,
        nativeElement: htmlItem
    };
}
