import { Directive } from "@angular/core";
import { SVGSymbolBaseDirective } from "./svg-symbol.base-directive";

@Directive({
    selector: "[dgpRectangle]",
})
export class RectangleDirective extends SVGSymbolBaseDirective {

    setAttributes(): void {
    }

}
