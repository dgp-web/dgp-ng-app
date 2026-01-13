import { Directive } from "@angular/core";
import { checkerboardMask } from "../constants";
import { SVGMaskBaseDirective } from "./svg-mask-base.directive";

@Directive({
    selector: "[dgpCheckerboardMask]",
    standalone: false
})
export class CheckerboardMaskDirective extends SVGMaskBaseDirective {

    model = checkerboardMask;

}
