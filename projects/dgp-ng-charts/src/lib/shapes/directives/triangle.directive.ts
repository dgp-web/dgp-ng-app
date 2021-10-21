import { Directive } from "@angular/core";
import { SVGShapeBaseDirective } from "./svg-shape.base-directive";
import { Many } from "data-modeling";
import { Point } from "../models";
import { serializePoints } from "../functions/serialize-points.function";

@Directive({
    selector: "[dgpTriangle]",
})
export class TriangleDirective extends SVGShapeBaseDirective {

    setAttributes(): void {
        const points: Many<Point> = [
            [this.width / 2, 0],
            [this.width, this.height],
            [0, this.height]
        ];
        this.renderer.setAttribute(this.elementRef.nativeElement, "points", serializePoints(points));
    }

}
