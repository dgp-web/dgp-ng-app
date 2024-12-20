import { Directive } from "@angular/core";
import { SVGMaskBaseDirective } from "./svg-mask-base.directive";
import { linesFromLeftBottomToRightTopMask } from "../constants";

@Directive({
    selector: "[dgpLinesFromLeftBottomToRightTopMask]",
    standalone: false
})
export class LinesFromLeftBottomToRightTopMaskDirective extends SVGMaskBaseDirective {

    model = linesFromLeftBottomToRightTopMask;

}
