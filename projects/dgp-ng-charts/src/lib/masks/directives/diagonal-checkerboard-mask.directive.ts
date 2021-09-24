import { Directive } from "@angular/core";
import { checkerboardMask, diagonalCheckerboardMask } from "../constants";
import { SVGMaskBaseDirective } from "./svg-mask-base.directive";

@Directive({selector: "[dgpDiagonalCheckerboardMask]"})
export class DiagonalCheckerboardMaskDirective extends SVGMaskBaseDirective {

    model = diagonalCheckerboardMask;

}
