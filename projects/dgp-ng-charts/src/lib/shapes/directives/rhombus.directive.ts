import { Directive } from "@angular/core";
import { SVGShapeBaseDirective } from "./svg-shape.base-directive";
import { serializePoints } from "../functions/serialize-points.function";
import { computeRhombusPoints } from "../functions/compute-rhombus-points.function";


@Directive({
    selector: "[dgpRhombus]",
})
export class RhombusDirective extends SVGShapeBaseDirective {

    setAttributes(): void {
        const points = computeRhombusPoints(this);
        this.renderer.setAttribute(this.elementRef.nativeElement, "points", serializePoints(points));
    }

}
