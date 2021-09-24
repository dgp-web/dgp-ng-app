import { Directive } from "@angular/core";
import { verticalLinesMask } from "../constants";
import { SVGMaskBaseDirective } from "./svg-mask-base.directive";

@Directive({selector: "[dgpVerticalLinesMask]"})
export class VerticalLinesMaskDirective extends SVGMaskBaseDirective {

    model = verticalLinesMask;

}
