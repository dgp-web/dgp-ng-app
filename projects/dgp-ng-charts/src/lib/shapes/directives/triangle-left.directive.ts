import { Directive } from "@angular/core";
import { SVGShapeBaseDirective } from "./svg-shape.base-directive";
import { serializePoints } from "../functions/serialize-points.function";
import { computeTriangleLeftPoints } from "../functions/compute-triangle-left-points.function";

@Directive({
    selector: "[dgpTriangleLeft]",
})
export class TriangleLeftDirective extends SVGShapeBaseDirective {

    setAttributes(): void {
        const points = computeTriangleLeftPoints(this);
        this.renderer.setAttribute(this.elementRef.nativeElement, "points", serializePoints(points));
    }

}
