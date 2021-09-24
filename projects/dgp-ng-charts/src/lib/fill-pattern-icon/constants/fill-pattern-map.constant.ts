import { FillPattern } from "../models";
import { SVGMask } from "../../masks/models";
import {
    checkerboardMask,
    diagonalCheckerboardMask,
    diagonalGridMask,
    gridMask,
    horizontalLinesMask, linesFromLeftBottomToRightTopMask, linesFromLeftTopToRightBottomMask, verticalLinesMask
} from "../../masks/constants";

export const fillPatternMap = new Map<FillPattern, SVGMask>([
    [FillPattern.Checkerboard, checkerboardMask],
    [FillPattern.DiagonalCheckerboard, diagonalCheckerboardMask],
    [FillPattern.DiagonalGrid, diagonalGridMask],
    [FillPattern.Grid, gridMask],
    [FillPattern.HorizontalLines, horizontalLinesMask],
    [FillPattern.LinesFromLeftBottomToRightTop, linesFromLeftBottomToRightTopMask],
    [FillPattern.LinesFromLeftTopToRightBottom, linesFromLeftTopToRightBottomMask],
    [FillPattern.VerticalLines, verticalLinesMask]
]);
