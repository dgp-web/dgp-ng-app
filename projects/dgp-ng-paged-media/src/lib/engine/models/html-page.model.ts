export interface HTMLElementContainer {
    type: "p";
    nativeElement: HTMLElement;
}

export interface HTMLPage {
    itemsOnPage: Array<HTMLElementContainer>;
}
