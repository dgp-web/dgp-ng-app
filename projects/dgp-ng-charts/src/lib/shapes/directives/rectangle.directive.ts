import { Directive } from "@angular/core";
import { SVGShapeBaseDirective } from "./svg-shape.base-directive";

@Directive({
    selector: "[dgpRectangle]",
})
export class RectangleDirective extends SVGShapeBaseDirective {

    setAttributes(): void {
    }

}
