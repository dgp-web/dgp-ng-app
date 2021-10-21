import { Directive } from "@angular/core";
import { SVGShapeBaseDirective } from "./svg-shape.base-directive";
import { Many } from "data-modeling";
import { Point } from "../models";
import { serializePoints } from "../functions/serialize-points.function";

@Directive({
    selector: "[dgpCross]",
})
export class CrossDirective extends SVGShapeBaseDirective {

    setAttributes(): void {
        const points: Many<Point> = [
            [0, this.height * 0.4],
            [this.width * 0.33, this.height * 0.3],
            [this.width / 2, 0],
            [this.width * 0.66, this.height * 0.3],
            [this.width, this.height * 0.4],
            [this.width * 0.76, this.height * 0.64],
            [this.width * 0.8, this.height],
            [this.width * 0.5, this.height * 0.8],
            [this.width * 0.2, this.height],
            [this.width * 0.24, this.height * 0.7],
            [0, this.height * 0.4]
        ];
        this.renderer.setAttribute(this.elementRef.nativeElement, "points", serializePoints(points));
    }

}
