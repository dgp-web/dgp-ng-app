import { Directive } from "@angular/core";
import { SVGMaskBaseDirective } from "./svg-mask-base.directive";
import { linesFromLeftTopToRightBottomMask } from "../constants";

@Directive({selector: "[dgpLinesFromLeftTopToRightBottomMask]"})
export class LinesFromLeftTopToRightBottomMaskDirective extends SVGMaskBaseDirective {

    model = linesFromLeftTopToRightBottomMask;

}
