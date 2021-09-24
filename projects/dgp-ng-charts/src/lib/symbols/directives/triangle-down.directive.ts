import { Directive } from "@angular/core";
import { SVGSymbolBaseDirective } from "./svg-symbol.base-directive";
import { Many } from "data-modeling";
import { Point } from "../models";
import { serializePoints } from "../functions/serialize-points.function";

@Directive({
    selector: "[dgpTriangleDown]",
})
export class TriangleDownDirective extends SVGSymbolBaseDirective {

    setAttributes(): void {
        const points: Many<Point> = [
            [0, 0],
            [this.width, 0],
            [this.width / 2, this.height]
        ];
        this.renderer.setAttribute(this.elementRef.nativeElement, "points", serializePoints(points));
    }

}
