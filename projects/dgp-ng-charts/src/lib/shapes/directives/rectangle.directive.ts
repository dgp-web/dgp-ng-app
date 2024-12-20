import { Directive } from "@angular/core";
import { SVGShapeBaseDirective } from "./svg-shape.base-directive";

@Directive({
    selector: "[dgpRectangle]",
    standalone: false
})
export class RectangleDirective extends SVGShapeBaseDirective {

    setAttributes(): void {
    }

}
