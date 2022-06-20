export interface HTMLSection {
    readonly type: "text" | "table" | "singleItem";
    readonly nativeElement: HTMLElement;
}
