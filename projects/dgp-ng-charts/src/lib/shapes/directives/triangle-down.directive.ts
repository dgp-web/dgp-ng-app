import { Directive } from "@angular/core";
import { SVGShapeBaseDirective } from "./svg-shape.base-directive";
import { serializePoints } from "../functions/serialize-points.function";
import { computeTriangleDownPoints } from "../functions/compute-triangle-down-points.function";

@Directive({
    selector: "[dgpTriangleDown]",
})
export class TriangleDownDirective extends SVGShapeBaseDirective {

    setAttributes(): void {
        const points = computeTriangleDownPoints(this);
        this.renderer.setAttribute(this.elementRef.nativeElement, "points", serializePoints(points));
    }

}
