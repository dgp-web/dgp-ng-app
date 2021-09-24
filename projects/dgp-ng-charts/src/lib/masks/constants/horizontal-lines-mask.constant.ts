import { SVGMask } from "../models";
import { horizontalLinesPattern } from "../../patterns/constants";

export const horizontalLinesMask: SVGMask = {
    svgMaskId: "horizontal-lines-mask",
    label: "Horizontal lines",
    svgPatternIds: [
        horizontalLinesPattern.svgPatternId
    ]
};
