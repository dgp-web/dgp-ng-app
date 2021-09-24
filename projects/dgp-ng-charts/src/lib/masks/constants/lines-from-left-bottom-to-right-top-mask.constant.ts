import { SVGMask } from "../models";
import { linesFromLeftBottomToRightTopPattern } from "../../patterns/constants";

export const linesFromLeftBottomToRightTopMask: SVGMask = {
    svgMaskId: "lines-from-left-bottom-to-right-top-mask",
    label: "Lines from left bottom to right top",
    svgPatternIds: [
        linesFromLeftBottomToRightTopPattern.svgPatternId
    ]
};
