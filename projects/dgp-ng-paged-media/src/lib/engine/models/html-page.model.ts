export enum HTMlElementType {
    Paragraph = "paragraph",
    Table = "table"
}

export interface HTMLElementContainer {
    type: HTMlElementType;
    nativeElement: HTMLElement;
}

export interface HTMLPage {
    itemsOnPage: Array<HTMLElementContainer>;
}
