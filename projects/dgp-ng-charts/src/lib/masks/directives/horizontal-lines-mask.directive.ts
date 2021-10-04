import { Directive } from "@angular/core";
import { horizontalLinesMask } from "../constants";
import { SVGMaskBaseDirective } from "./svg-mask-base.directive";

@Directive({selector: "[dgpHorizontalLinesMask]"})
export class HorizontalLinesMaskDirective extends SVGMaskBaseDirective {

    model = horizontalLinesMask;

}
