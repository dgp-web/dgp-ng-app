import { Directive } from "@angular/core";
import { gridMask } from "../constants";
import { SVGMaskBaseDirective } from "./svg-mask-base.directive";

@Directive({selector: "[dgpGridMask]"})
export class GridMaskDirective extends SVGMaskBaseDirective {

    model = gridMask;

}
