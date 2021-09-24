import { HorizontalLinesMaskDirective } from "./horizontal-lines-mask.directive";
import { VerticalLinesMaskDirective } from "./vertical-lines-mask.directive";
import { LinesFromLeftTopToRightBottomMaskDirective } from "./lines-from-left-top-to-right-bottom-mask.directive";
import { LinesFromLeftBottomToRightTopMaskDirective } from "./lines-from-left-bottom-to-right-top-mask.directive";

export const directives = [
    HorizontalLinesMaskDirective,
    LinesFromLeftBottomToRightTopMaskDirective,
    LinesFromLeftTopToRightBottomMaskDirective,
    VerticalLinesMaskDirective
];
