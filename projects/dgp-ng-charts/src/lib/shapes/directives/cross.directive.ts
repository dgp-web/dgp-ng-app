import { Directive } from "@angular/core";
import { SVGShapeBaseDirective } from "./svg-shape.base-directive";
import { serializePoints } from "../functions/serialize-points.function";
import { computeCrossPoints } from "../functions/compute-cross-points.function";

@Directive({
    selector: "[dgpCross]",
})
export class CrossDirective extends SVGShapeBaseDirective {

    setAttributes(): void {
        const points = computeCrossPoints(this);
        this.renderer.setAttribute(this.elementRef.nativeElement, "points", serializePoints(points));
    }

}
