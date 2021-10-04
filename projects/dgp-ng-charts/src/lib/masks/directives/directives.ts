import { HorizontalLinesMaskDirective } from "./horizontal-lines-mask.directive";
import { VerticalLinesMaskDirective } from "./vertical-lines-mask.directive";
import { LinesFromLeftTopToRightBottomMaskDirective } from "./lines-from-left-top-to-right-bottom-mask.directive";
import { LinesFromLeftBottomToRightTopMaskDirective } from "./lines-from-left-bottom-to-right-top-mask.directive";
import { GridMaskDirective } from "./grid-mask.directive";
import { DiagonalGridMaskDirective } from "./diagonal-grid-mask.directive";
import { CheckerboardMaskDirective } from "./checkerboard-mask.directive";
import { DiagonalCheckerboardMaskDirective } from "./diagonal-checkerboard-mask.directive";

export const directives = [
    CheckerboardMaskDirective,
    DiagonalCheckerboardMaskDirective,
    DiagonalGridMaskDirective,
    GridMaskDirective,
    HorizontalLinesMaskDirective,
    LinesFromLeftBottomToRightTopMaskDirective,
    LinesFromLeftTopToRightBottomMaskDirective,
    VerticalLinesMaskDirective
];
