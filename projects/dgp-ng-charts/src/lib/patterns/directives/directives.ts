import { VerticalLinesPatternDirective } from "./vertical-lines-pattern.directive";
import { HorizontalLinesPatternDirective } from "./horizontal-lines-pattern.directive";
import { LinesFromLeftTopToRightBottomPatternDirective } from "./lines-from-left-top-to-right-bottom-pattern.directive";
import { LinesFromLeftBottomToRightTopPatternDirective } from "./lines-from-left-bottom-to-right-bottom-top.directive";
import { CheckerboardPatternDirective } from "./checkerboard-pattern.directive";

export const directives = [
    CheckerboardPatternDirective,
    HorizontalLinesPatternDirective,
    LinesFromLeftBottomToRightTopPatternDirective,
    LinesFromLeftTopToRightBottomPatternDirective,
    VerticalLinesPatternDirective
];
