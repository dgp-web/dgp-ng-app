import { Directive } from "@angular/core";
import { SVGShapeBaseDirective } from "./svg-shape.base-directive";
import { serializePoints } from "../functions/serialize-points.function";
import { computeTriangleRightPoints } from "../functions/compute-triangle-right-points.function";

@Directive({
    selector: "[dgpTriangleRight]",
})
export class TriangleRightDirective extends SVGShapeBaseDirective {

    setAttributes(): void {
        const points = computeTriangleRightPoints(this);
        this.renderer.setAttribute(this.elementRef.nativeElement, "points", serializePoints(points));
    }

}
