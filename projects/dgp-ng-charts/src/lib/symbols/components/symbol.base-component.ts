import { Directive, Input } from "@angular/core";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class SymbolBaseComponent {
    @Input()
    width = 24;
    @Input()
    height = this.width;
    @Input()
    fillColor: string;
}