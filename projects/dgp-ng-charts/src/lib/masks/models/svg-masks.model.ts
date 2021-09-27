import { SVGMask } from "./svg-mask.model";

export interface SVGMasks {
    readonly verticalLines: SVGMask;
    readonly horizontalLines: SVGMask;
    readonly linesFromLeftTopToRightBottom: SVGMask;
    readonly linesFromLeftBottomToRightTop: SVGMask;
    readonly grid: SVGMask;
    readonly diagonalGrid: SVGMask;
    readonly checkerboard: SVGMask;
    readonly diagonalCheckerboard: SVGMask;
}
