import { Directive } from "@angular/core";
import { checkerboardMask } from "../constants";
import { SVGMaskBaseDirective } from "./svg-mask-base.directive";

@Directive({selector: "[dgpCheckerboardMask]"})
export class CheckerboardMaskDirective extends SVGMaskBaseDirective {

    model = checkerboardMask;

}
