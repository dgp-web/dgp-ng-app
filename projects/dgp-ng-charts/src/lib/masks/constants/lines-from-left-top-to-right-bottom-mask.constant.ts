import { SVGMask } from "../models";
import { linesFromLeftTopToRightBottomPattern } from "../../patterns/constants";

export const linesFromLeftTopToRightBottomMask: SVGMask = {
    svgMaskId: "lines-from-left-top-to-right-bottom-mask",
    label: "Lines from left top to right bottom",
    svgPatternIds: [
        linesFromLeftTopToRightBottomPattern.svgPatternId
    ]
};
