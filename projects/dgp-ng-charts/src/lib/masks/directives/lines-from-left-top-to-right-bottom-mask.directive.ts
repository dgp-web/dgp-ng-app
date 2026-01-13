import { Directive } from "@angular/core";
import { SVGMaskBaseDirective } from "./svg-mask-base.directive";
import { linesFromLeftTopToRightBottomMask } from "../constants";

@Directive({
    selector: "[dgpLinesFromLeftTopToRightBottomMask]",
    standalone: false
})
export class LinesFromLeftTopToRightBottomMaskDirective extends SVGMaskBaseDirective {

    model = linesFromLeftTopToRightBottomMask;

}
