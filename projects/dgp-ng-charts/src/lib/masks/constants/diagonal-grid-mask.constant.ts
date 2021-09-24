import { SVGMask } from "../models";
import { linesFromLeftBottomToRightTopPattern, linesFromLeftTopToRightBottomPattern } from "../../patterns/constants";

export const diagonalGridMask: SVGMask = {
    svgMaskId: "diagonal-grid-mask",
    label: "Diagonal grid",
    svgPatternIds: [
        linesFromLeftBottomToRightTopPattern.svgPatternId,
        linesFromLeftTopToRightBottomPattern.svgPatternId
    ]
};
