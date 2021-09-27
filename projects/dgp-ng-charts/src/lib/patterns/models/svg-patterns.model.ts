import { SVGPattern } from "./svg-pattern.model";

export interface SVGPatterns {
    readonly horizontalLines: SVGPattern;
    readonly verticalLines: SVGPattern;
    readonly linesFromLeftTopToRightBottom: SVGPattern;
    readonly linesFromLeftBottomToRightTop: SVGPattern;
    readonly checkerboard: SVGPattern;
    readonly diagonalCheckerboard: SVGPattern;
}
