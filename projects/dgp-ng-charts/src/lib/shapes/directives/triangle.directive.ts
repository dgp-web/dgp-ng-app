import { Directive } from "@angular/core";
import { SVGShapeBaseDirective } from "./svg-shape.base-directive";
import { serializePoints } from "../functions/serialize-points.function";
import { computeTrianglePoints } from "../functions/compute-triangle-points.function";

@Directive({
    selector: "[dgpTriangle]",
})
export class TriangleDirective extends SVGShapeBaseDirective {

    setAttributes(): void {
        const points = computeTrianglePoints(this);
        this.renderer.setAttribute(this.elementRef.nativeElement, "points", serializePoints(points));
    }

}
