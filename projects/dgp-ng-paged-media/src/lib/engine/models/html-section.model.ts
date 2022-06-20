export interface HTMLSection {
    readonly type: "text" | "table" | "heading";
    readonly nativeElement: HTMLElement;
}
