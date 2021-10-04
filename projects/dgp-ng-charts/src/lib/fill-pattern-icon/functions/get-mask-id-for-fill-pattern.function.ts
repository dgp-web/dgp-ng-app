import { FillPattern } from "../models";

export function getMaskIdForFillPattern(
    fillPattern: FillPattern
): string {
    let maskId = "null";

    switch (fillPattern) {
        case FillPattern.All:
            break;
        case FillPattern.VerticalLines:
            maskId = "vertical-lines-mask";
            break;
        case FillPattern.LinesFromLeftTopToRightBottom:
            maskId = "lines-from-left-top-to-right-bottom-mask";
            break;
        case FillPattern.HorizontalLines:
            maskId = "horizontal-lines-mask";
            break;
        case FillPattern.LinesFromLeftBottomToRightTop:
            maskId = "lines-from-left-bottom-to-right-top-mask";
            break;
        case FillPattern.Grid:
            maskId = "grid-mask";
            break;
        case FillPattern.DiagonalGrid:
            maskId = "diagonal-grid-mask";
            break;
        case FillPattern.Checkerboard:
            maskId = "checkerboard-mask";
            break;
        case FillPattern.DiagonalCheckerboard:
            maskId = "diagonal-checkerboard-mask";
            break;
    }

    return maskId;
}
