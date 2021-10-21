import { Directive } from "@angular/core";
import { SVGShapeBaseDirective } from "./svg-shape.base-directive";
import { Many } from "data-modeling";
import { Point } from "../models";
import { serializePoints } from "../functions/serialize-points.function";

@Directive({
    selector: "[dgpTriangleLeft]",
})
export class TriangleLeftDirective extends SVGShapeBaseDirective {

    setAttributes(): void {
        const points: Many<Point> = [
            [0, this.height / 2],
            [this.width, 0],
            [this.width, this.height]
        ];
        this.renderer.setAttribute(this.elementRef.nativeElement, "points", serializePoints(points));
    }

}
