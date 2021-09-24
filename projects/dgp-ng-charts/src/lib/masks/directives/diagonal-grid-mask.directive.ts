import { Directive } from "@angular/core";
import { diagonalGridMask, gridMask } from "../constants";
import { SVGMaskBaseDirective } from "./svg-mask-base.directive";

@Directive({selector: "[dgpDiagonalGridMask]"})
export class DiagonalGridMaskDirective extends SVGMaskBaseDirective {

    model = diagonalGridMask;

}
