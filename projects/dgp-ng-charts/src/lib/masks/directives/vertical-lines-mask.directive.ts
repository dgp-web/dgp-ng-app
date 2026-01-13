import { Directive } from "@angular/core";
import { verticalLinesMask } from "../constants";
import { SVGMaskBaseDirective } from "./svg-mask-base.directive";

@Directive({
    selector: "[dgpVerticalLinesMask]",
    standalone: false
})
export class VerticalLinesMaskDirective extends SVGMaskBaseDirective {

    model = verticalLinesMask;

}
