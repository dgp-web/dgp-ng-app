import { Directive } from "@angular/core";
import { SVGShapeBaseDirective } from "./svg-shape.base-directive";
import { serializePoints } from "../functions/serialize-points.function";
import { computeStarPoints } from "../functions/compute-star-points.function";

@Directive({
    selector: "[dgpStar]",
})
export class StarDirective extends SVGShapeBaseDirective {

    setAttributes(): void {
        const points = computeStarPoints(this);
        this.renderer.setAttribute(this.elementRef.nativeElement, "points", serializePoints(points));
    }

}
